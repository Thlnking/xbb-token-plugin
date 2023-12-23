
import { useState } from "react";

import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, ButtonGroup } from "@nextui-org/react";
import { stylex } from "@stylexjs/stylex";
import { cardStyles } from "./style";
import AceEditor from "react-ace";
import ace from "ace-builds";
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect } from "react";
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);


const TokenInput = () => {


    const [validate, setValidate] = useState(true)

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
                {/* <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                        </div>
                    </div>
                    <ButtonGroup>
                        <Button
                            onPress={() => setIsFollowed(!isFollowed)}
                            className="text-tiny text-white bg-black/10"
                            variant="flat"
                            color="default"
                            radius="lg"
                            size="sm"
                        >
                            复制
                        </Button>
                        <Button
                            onPress={() => setIsFollowed(!isFollowed)}
                            className="text-tiny text-white bg-black/10"
                            variant="flat"
                            color="default"
                            radius="lg"
                            size="sm"
                        >
                            保存
                        </Button>
                    </ButtonGroup>
                </CardHeader> */}
                <CardBody className="px-0 py-0 h-56 text-small text-default-400">
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
                        width="100%"
                        height="100%"
                        mode="json"
                        theme="tomorrow"
                        onChange={(value, event) => {
                            console.log('[ value ] >', value, event)
                        }}
                        onValidate={(annotations) => {
                            console.log('[ annotations ] >', annotations)
                            setValidate(annotations.length === 0)
                        }}

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