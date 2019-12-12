import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { MsalModuleConfiguration, buildMsalModuleConfiguration } from "../../../src/app/config/MsalModuleConfiguration";
import { PkceCodes } from "../../../src/utils/crypto/ICrypto";
import { AuthError } from "../../../src/error/AuthError";
const expect = chai.expect;
chai.use(chaiAsPromised);

describe("MsalModuleConfiguration.ts Class Unit Tests", () => {

    it("buildMsalModuleConfiguration assigns default functions", async () => {
        let emptyConfig: MsalModuleConfiguration = buildMsalModuleConfiguration({});
        // Crypto interface checks
        expect(emptyConfig.cryptoInterface).to.be.not.null;
        expect(emptyConfig.cryptoInterface.base64Decode).to.be.not.null;
        expect(() => emptyConfig.cryptoInterface.base64Decode("test input")).to.throw("Unexpected error in authentication.: Crypto interface - base64Decode() has not been implemented");
        expect(() => emptyConfig.cryptoInterface.base64Decode("test input")).to.throw(AuthError);
        expect(emptyConfig.cryptoInterface.base64Encode).to.be.not.null;
        expect(() => emptyConfig.cryptoInterface.base64Encode("test input")).to.throw("Unexpected error in authentication.: Crypto interface - base64Encode() has not been implemented");
        expect(() => emptyConfig.cryptoInterface.base64Encode("test input")).to.throw(AuthError);
        expect(emptyConfig.cryptoInterface.generatePkceCodes).to.be.not.null;
        await expect(emptyConfig.cryptoInterface.generatePkceCodes()).to.be.rejectedWith("Unexpected error in authentication.: Crypto interface - generatePkceCodes() has not been implemented");
        await expect(emptyConfig.cryptoInterface.generatePkceCodes()).to.be.rejectedWith(AuthError);
        // Storage interface checks
        expect(emptyConfig.storageInterface).to.be.not.null;
        expect(emptyConfig.storageInterface.clear).to.be.not.null;
        expect(() => emptyConfig.storageInterface.clear()).to.throw("Unexpected error in authentication.: Storage interface - clear() has not been implemented");
        expect(() => emptyConfig.storageInterface.clear()).to.throw(AuthError);
        expect(emptyConfig.storageInterface.containsKey).to.be.not.null;
        expect(() => emptyConfig.storageInterface.containsKey("testKey")).to.throw("Unexpected error in authentication.: Storage interface - containsKey() has not been implemented");
        expect(() => emptyConfig.storageInterface.containsKey("testKey")).to.throw(AuthError);
        expect(emptyConfig.storageInterface.getItem).to.be.not.null;
        expect(() => emptyConfig.storageInterface.getItem("testKey")).to.throw("Unexpected error in authentication.: Storage interface - getItem() has not been implemented");
        expect(() => emptyConfig.storageInterface.getItem("testKey")).to.throw(AuthError);
        expect(emptyConfig.storageInterface.getKeys).to.be.not.null;
        expect(() => emptyConfig.storageInterface.getKeys()).to.throw("Unexpected error in authentication.: Storage interface - getKeys() has not been implemented");
        expect(() => emptyConfig.storageInterface.getKeys()).to.throw(AuthError);
        expect(emptyConfig.storageInterface.removeItem).to.be.not.null;
        expect(() => emptyConfig.storageInterface.removeItem("testKey")).to.throw("Unexpected error in authentication.: Storage interface - removeItem() has not been implemented");
        expect(() => emptyConfig.storageInterface.removeItem("testKey")).to.throw(AuthError);
        expect(emptyConfig.storageInterface.setItem).to.be.not.null;
        expect(() => emptyConfig.storageInterface.setItem("testKey", "testValue")).to.throw("Unexpected error in authentication.: Storage interface - setItem() has not been implemented");
        expect(() => emptyConfig.storageInterface.setItem("testKey", "testValue")).to.throw(AuthError);
        // Network interface checks
        expect(emptyConfig.networkInterface).to.be.not.null;
        expect(emptyConfig.networkInterface.sendGetRequestAsync).to.be.not.null;
        await expect(emptyConfig.networkInterface.sendGetRequestAsync("", null, "")).to.be.rejectedWith("Unexpected error in authentication.: Network interface - sendGetRequestAsync() has not been implemented");
        await expect(emptyConfig.networkInterface.sendGetRequestAsync("", null, "")).to.be.rejectedWith(AuthError);
        expect(emptyConfig.networkInterface.sendPostRequestAsync).to.be.not.null;
        await expect(emptyConfig.networkInterface.sendPostRequestAsync("", null, "")).to.be.rejectedWith("Unexpected error in authentication.: Network interface - sendPostRequestAsync() has not been implemented");
        await expect(emptyConfig.networkInterface.sendPostRequestAsync("", null, "")).to.be.rejectedWith(AuthError);
    });

    const clearFunc = (): void => {
        return;
    };

    const removeFunc = (key: string): void => {
        return;
    };

    const setFunc = (key: string, value: string): void => {
        return;
    };

    const testPkceCodes = {
        challenge: "TestChallenge",
        verifier: "TestVerifier"
    } as PkceCodes;

    const testNetworkResult = {
        testParam: "testValue"
    };

    const testKeySet = ["testKey1", "testKey2"];

    it("buildMsalConfiguration correctly assigns new values", () => {
        let newConfig: MsalModuleConfiguration = buildMsalModuleConfiguration({
            cryptoInterface: {
                createNewGuid: (): string => {
                    return "newGuid";
                },
                base64Decode: (input: string): string => {
                    return "testDecodedString";
                },
                base64Encode: (input: string): string => {
                    return "testEncodedString";
                },
                generatePkceCodes: async (): Promise<PkceCodes> => {
                    return testPkceCodes;
                }
            },
            storageInterface: {
                clear: clearFunc,
                containsKey: (key: string): boolean => {
                    return true;
                },
                getItem: (key: string): string => {
                    return "cacheItem";
                },
                getKeys: (): string[] => {
                    return testKeySet;
                },
                removeItem: removeFunc,
                setItem: setFunc
            },
            networkInterface: {
                sendGetRequestAsync: async (url: string, headers?: Map<string, string>, body?: string): Promise<any> => {
                    return testNetworkResult;
                },
                sendPostRequestAsync: async (url: string, headers?: Map<string, string>, body?: string): Promise<any> => {
                    return testNetworkResult;
                }
            }
        });
        // Crypto interface tests
        expect(newConfig.cryptoInterface).to.be.not.null;
        expect(newConfig.cryptoInterface.base64Decode).to.be.not.null;
        expect(newConfig.cryptoInterface.base64Decode("testString")).to.be.eq("testDecodedString");
        expect(newConfig.cryptoInterface.base64Encode).to.be.not.null;
        expect(newConfig.cryptoInterface.base64Encode("testString")).to.be.eq("testEncodedString");
        expect(newConfig.cryptoInterface.generatePkceCodes).to.be.not.null;
        expect(newConfig.cryptoInterface.generatePkceCodes()).to.eventually.eq(testPkceCodes);
        // Storage interface tests
        expect(newConfig.storageInterface).to.be.not.null;
        expect(newConfig.storageInterface.clear).to.be.not.null;
        expect(newConfig.storageInterface.clear).to.be.eq(clearFunc);
        expect(newConfig.storageInterface.containsKey).to.be.not.null;
        expect(newConfig.storageInterface.containsKey("testKey")).to.be.true;
        expect(newConfig.storageInterface.getItem).to.be.not.null;
        expect(newConfig.storageInterface.getItem("testKey")).to.be.eq("cacheItem");
        expect(newConfig.storageInterface.getKeys).to.be.not.null;
        expect(newConfig.storageInterface.getKeys()).to.be.eq(testKeySet);
        expect(newConfig.storageInterface.removeItem).to.be.not.null;
        expect(newConfig.storageInterface.removeItem).to.be.eq(removeFunc);
        expect(newConfig.storageInterface.setItem).to.be.not.null;
        expect(newConfig.storageInterface.setItem).to.be.eq(setFunc);
        // Network interface tests
        expect(newConfig.networkInterface).to.be.not.null;
        expect(newConfig.networkInterface.sendGetRequestAsync).to.be.not.null;
        expect(newConfig.networkInterface.sendGetRequestAsync("", null, "")).to.eventually.eq(testNetworkResult);
        expect(newConfig.networkInterface.sendPostRequestAsync).to.be.not.null;
        expect(newConfig.networkInterface.sendPostRequestAsync("", null, "")).to.eventually.eq(testNetworkResult);
    });
});