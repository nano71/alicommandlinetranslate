// This file is auto-generated, don't edit it
import alimt20181012, * as $aliMachineTranslate from '@alicloud/alimt20181012';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import * as $OpenApi from '@alicloud/openapi-client';
import Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';
import key from './key'

export default class Client {

    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(accessKeyId: string, accessKeySecret: string): alimt20181012 {
        let config = new $OpenApi.Config({
            // 您的AccessKey ID
            accessKeyId: accessKeyId,
            // 您的AccessKey Secret
            accessKeySecret: accessKeySecret,
        });
        // 访问的域名
        config.endpoint = `mt.cn-hangzhou.aliyuncs.com`;
        return new alimt20181012(config);
    }

    static async main(args: String, source: String = "auto", target: String = "zh"): Promise<string> {
        let client = Client.createClient(key.AccessKeyID, key.AccessKeySecret);
        let translateGeneralRequest = new $aliMachineTranslate.TranslateGeneralRequest({
            sourceLanguage: source,
            targetLanguage: target,
            formatType: "text",
            sourceText: args,
        });
        let resp = await client.translateGeneral(translateGeneralRequest);
        // console.log($tea.toMap(resp).body.Data);
        console.info("翻译结果:")
        return Util.toJSONString($tea.toMap(resp).body.Data.Translated);
    }

}
// console.log("start");
// Client.main("我爱你").then(console.log);
