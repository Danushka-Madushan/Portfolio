import axios, { AxiosRequestConfig } from 'axios'
import { ENV } from '../constant/config';
import { SignRequest } from './tokens';

export const getSignedLink = async (rawLink: string, sha: string) => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `${ENV.EDGE}/transform`,
    headers: {
      'x-app-auth': await SignRequest({ raw_link: rawLink, sha })
    }
  }

  const { data } = await axios<{ link: string }>(config);
  return data;
}
