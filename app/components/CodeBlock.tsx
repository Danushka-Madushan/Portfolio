'use client'

import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import { firaCode } from '../fonts/fonts';
import { Button, Tab, Tabs } from '@heroui/react';
import { Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/clip';

type iLang = 'ts' | 'js' | 'cs' | 'jv' | 'py' | 'go'
type iRuntime = 'server' | 'web'

interface CodeBlockProps {
  snippetTitle: string;
  isOpen: boolean;
  onOpenChange: () => void;
  DefaultSelection: iLang
  JsCodeStringServer?: string;
  TsCodeStringServer: string;
  JsCodeStringWeb?: string;
  TsCodeStringWeb?: string;
  CSCodeString?: string;
  JavaCodeString?: string;
  PyCodeString?: string;
  GoCodeString?: string;
}

const CodeBlock = ({
  DefaultSelection,
  snippetTitle,
  JsCodeStringWeb,
  TsCodeStringWeb,
  JsCodeStringServer,
  TsCodeStringServer,
  CSCodeString,
  JavaCodeString,
  PyCodeString,
  GoCodeString,
  isOpen,
  onOpenChange
}: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [codeString, setCodeString] = useState(TsCodeStringServer);
  const [selectedLang, setSelectedLang] = useState<iLang>(DefaultSelection);
  const [selectedRuntime, setSelectedRuntime] = useState<iRuntime>('server');

  const LANGS: Record<iLang, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'cs': 'csharp',
    'jv': 'java',
    'py': 'python',
    'go': 'go'
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(codeString);
    if (success) {
      setIsCopied(true);
      toast.success("Copied!");
      setTimeout(() => setIsCopied(false), 1500); /* Reset after 2 seconds */
    }
  };

  useEffect(() => {
    switch (selectedLang) {
      case 'js': {
        if (selectedRuntime === 'server') {
          if (JsCodeStringServer) {
            setCodeString(JsCodeStringServer);
          }
          break;
        }
        if (JsCodeStringWeb) {
          setCodeString(JsCodeStringWeb);
        }
        break;
      }
      case 'ts': {
        if (selectedRuntime === 'server') {
          setCodeString(TsCodeStringServer);
          break;
        }
        if (TsCodeStringWeb) {
          setCodeString(TsCodeStringWeb);
        }
        break;
      }
      case 'cs': {
        if (CSCodeString) {
          setCodeString(CSCodeString)
        }
        break;
      }
      case 'jv': {
        if (JavaCodeString) {
          setCodeString(JavaCodeString)
        }
        break;
      }
      case 'py': {
        if (PyCodeString) {
          setCodeString(PyCodeString)
        }
        break;
      }
      case 'go': {
        if (GoCodeString) {
          setCodeString(GoCodeString)
        }
        break;
      }
    }
    /* eslint-disable-next-line */
  }, [selectedLang, selectedRuntime]);

  return (
    <Modal
      isDismissable={true}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='3xl'
      classNames={{
        base: 'bg-[#02060c] border-1 border-gray-100/20 rounded-lg',
        body: 'px-4 py-2 relative',
        footer: 'pt-0 flex flex-row items-center justify-between',
        header: 'pb-0'
      }}
      backdrop='opaque'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className={`${firaCode.className} text-sm justify-center font-light`}>Code Snippet - {snippetTitle}</ModalHeader>
            <ModalBody>
              <SyntaxHighlighter showLineNumbers language={LANGS[selectedLang]} style={oneDark} customStyle={{
                fontSize: 13.5,
              }}>
                {codeString}
              </SyntaxHighlighter>
              <Button
                onPress={handleCopy}
                className='absolute right-5 top-5'
                color='default'
                variant='solid'
                isIconOnly>
                {isCopied ? <Check size={14} strokeWidth={1} /> : <Copy size={14} strokeWidth={1} />}
              </Button>
            </ModalBody>
            <ModalFooter>
              <Tabs
                isDisabled={['cs', 'jv', 'py', 'go'].includes(selectedLang)}
                onSelectionChange={(value) => setSelectedRuntime(String(value) as iRuntime)}
                selectedKey={selectedRuntime}
                classNames={{
                  tabContent: `${firaCode.className} text-sm font-light`
                }}
              >
                <Tab
                  key="web" title="Browser"
                />
                <Tab
                  key="server" title="Server"
                />
              </Tabs>
              <Tabs
                onSelectionChange={(value) => setSelectedLang(String(value) as iLang)}
                selectedKey={selectedLang}
                classNames={{
                  tabContent: `${firaCode.className} text-sm font-light`
                }}
              >
                {
                  (JsCodeStringServer || JsCodeStringWeb) && (
                    <Tab
                      key="js" title="JS"
                    />
                  )
                }
                {
                  (TsCodeStringServer || TsCodeStringWeb) && (
                    <Tab
                      key="ts" title="TS"
                    />
                  )
                }
                {
                  (PyCodeString) && (
                    <Tab
                      key="py" title="Python"
                    />
                  )
                }
                {
                  (CSCodeString) && (
                    <Tab
                      key="cs" title="C#"
                    />
                  )
                }
                {
                  (JavaCodeString) && (
                    <Tab
                      key="jv" title="Java"
                    />
                  )
                }
                {
                  (GoCodeString) && (
                    <Tab
                      key="go" title="Go"
                    />
                  )
                }
              </Tabs>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CodeBlock
