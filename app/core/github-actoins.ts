'use server'

import { ENV, userAgent } from '@/app/constant/config'
import { iRepoGet } from '@github'
import { Octokit } from '@octokit/core'
import { unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getSignedLink } from './xhr'

const octokit = new Octokit({
  auth: ENV.GITBUCKET_REPO_ACCESS_TOKEN,
  userAgent: userAgent,
  timeZone: 'Asia/Colombo'
})

export const CheckInUpload = async (rawFile: File) => {
  try {
    const arrayBuffer = await rawFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const tempPath = join(tmpdir(), rawFile.name)

    /* Save Buffer to Temp */
    await writeFile(tempPath, buffer)

    /* Convert to Base64 */
    const base64Content = buffer.toString('base64')
    const destPath = `uploads/${rawFile.name}`

    let sha: string | undefined
    try {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: ENV.OWNER,
        repo: ENV.REPO,
        path: destPath,
      });
      sha = (data as iRepoGet).sha
    } catch {
      /* ignore 404 - means file doesn't exist */
    }

    const { data } = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: ENV.OWNER,
      repo: ENV.REPO,
      path: destPath,
      message: sha ? `Update ${rawFile.name}` : `Add ${rawFile.name}`,
      content: base64Content,
      headers: {
        'accept': 'application/vnd.github+json'
      },
      sha
    })

    const { content } = data;

    if (!content) { return false; }
    if (!content.download_url) { return false; }
    if (!content.sha) { return false; }

    /* Cleanup Temp Buffer */
    const [download_link] = await Promise.all([
      await getSignedLink(content.download_url, content.sha), await unlink(tempPath)
    ])
    return download_link

  } catch (error: unknown) {
    console.error('Upload Error:', error);
    return false;
  }
}
