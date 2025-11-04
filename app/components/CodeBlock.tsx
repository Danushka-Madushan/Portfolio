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

interface CodeBlockProps {
  isOpen: boolean;
  onOpenChange: () => void;
  JsCodeStringWeb: string;
  TsCodeStringWeb: string;
  JsCodeStringServer: string;
  TsCodeStringServer: string;
  CSCodeString: string;
  JavaCodeString: string;
  PyCodeString: string;
  GoCodeString: string;
}

const CodeBlock = ({
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
  const [codeString, setCodeString] = useState(TsCodeStringWeb);
  const [selectedLang, setSelectedLang] = useState<iLang>('js');
  const [selectedRuntime, setSelectedRuntime] = useState<iRuntime>('web');
  type iLang = 'ts' | 'js' | 'cs' | 'jv' | 'py' | 'go'
  type iRuntime = 'server' | 'web'

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
          setCodeString(JsCodeStringServer);
          break;
        }
        setCodeString(JsCodeStringWeb);
        break;
      }
      case 'ts': {
        if (selectedRuntime === 'server') {
          setCodeString(TsCodeStringServer);
          break;
        }
        setCodeString(TsCodeStringWeb);
        break;
      }
      case 'cs': {
        setCodeString(CSCodeString)
        break;
      }
      case 'jv': {
        setCodeString(JavaCodeString);
        break;
      }
      case 'py': {
        setCodeString(PyCodeString);
        break;
      }
      case 'go': {
        setCodeString(GoCodeString)
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
            <ModalHeader className={`${firaCode.className} text-sm justify-center font-light`}>Code Snippet - Base64 Encode/Decode</ModalHeader>
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
                  tabContent:`${firaCode.className} text-sm font-light`
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
                  tabContent:`${firaCode.className} text-sm font-light`
                }}
              >
                <Tab
                  key="js" title="JS"
                />
                <Tab
                  key="ts" title="TS"
                />
                <Tab
                  key="py" title="Python"
                />
                <Tab
                  key="cs" title="C#"
                />
                <Tab
                  key="jv" title="Java"
                />
                <Tab
                  key="go" title="Go"
                />
              </Tabs>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CodeBlock
