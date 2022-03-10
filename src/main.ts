#!/usr/bin/env node

import {program} from "commander";
// @ts-ignore
import {version} from '../package.json';
import Client from "./client";

program
    .version(version)
    .argument("<text>", "输入")
    .name("t")
    .option("-s --source <string>", "源文语言")
    .option("-t --target <string>", "译文语言")
    .action(async (text, option) => {
        let source: String, target: String, pattern: RegExp = new RegExp("[\u4E00-\u9FA5]+");
        ({source, target} = option);
        if (option) {
            source = pattern.test(text) ? "zh" : "en"
            target = !pattern.test(text) ? "zh" : "en"
        }
        console.info("源文语言: " + `${pattern.test(text) ? "zh" : "en"}`, "译文语言: " + `${!pattern.test(text) ? "zh" : "en"}`, " 要翻译的内容: " + text)
        if (!text) {
            giveDestExamples()
        } else {
            await Client.main(text, source, target).then(console.info)
            setTimeout(() => {
                console.info("准备自动关闭")
            }, 10000)
        }
    });

program.on("--help", () => {
    giveDestExamples()
});

const giveDestExamples = () => {
    console.info("-------------------");
    console.info("使用方法:");
    console.info("  $ t 你好");
    console.info("  $ t hello -l zh");
    console.info("-------------------");
    console.info("-s <源文语言> -t <译文语言> 值可为:");
    console.info({
        en: "英文",
        zh: "中文",
        tw: "繁体中文",
        yue: "粤语",
        wyw: "文言文",
        jp: "日语",
        kor: "韩语",
        fra: "法语",
        it: "意大利语",
    });
}

program.parse(process.argv);
