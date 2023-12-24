
import { useState } from "react";

import { Card, CardBody, Button, ButtonGroup } from "@nextui-org/react";
import { stylex } from "@stylexjs/stylex";
import { cardStyles } from "./style";
import AceEditor from "react-ace";
import ace from "ace-builds";
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect } from "react";
import { useRef } from "react";
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);




const TokenInput = () => {

    const isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const [validate, setValidate] = useState(true)
    const [inputValue, setInputValue] = useState('{}')
    const editor = useRef(null)

    useEffect(() => {
        console.log('[ ace ] >', ace)
    }, [])

    return (
        <>

            <Card className="max-w-[550px]"
                {
                ...stylex.props(cardStyles.card)
                }
            >
                <CardBody className="px-0 py-0 h-60 text-small text-default-400">
                    <div>
                        <ButtonGroup className="w-full ">
                            <Button
                                className="text-tiny text-white bg-black/10 w-6/12"
                                variant="flat"
                                color="default"
                                radius="none"
                                size="sm"
                                disabled={!validate}
                            >
                                保存
                            </Button>
                            <Button className="text-tiny text-white bg-black/10 w-6/12"
                                variant="flat"
                                color="default"
                                radius="none"
                                size="sm"
                            >
                                使用
                            </Button>
                        </ButtonGroup>
                    </div>
                    <AceEditor
                        ref={editor}
                        value={inputValue}
                        width="100%"
                        height="100%"
                        mode="json"
                        theme="tomorrow"
                        onValidate={(annotations) => {
                            console.log('[ annotations ] >', annotations)
                            setValidate(annotations.length === 0)
                        }}
                        onPaste={(value) => {
                            if (isJson(value)) {
                                setInputValue(JSON.stringify(JSON.parse(value), null, 4))
                            }
                        }}
                        enableBasicAutocompletion
                        name="token-json-edit"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableSnippets: true,
                            enableLiveAutocompletion: true
                        }}
                    />

                </CardBody>
            </Card >
        </>
    )
}

export default TokenInput