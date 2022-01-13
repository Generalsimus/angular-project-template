import { objectToString } from "../utils/objectToString";



/** 
 * @export CacheQuery  ქმნის უნიკალურ keys მექზე გაგზავნილი რექვესთისშვის და ახდენს მის ჩეშირებას ლოკალურ ცვლადში ან localStorage ში
 * @param {boolean} [saveInLocalStorage=false] saveInLocalStorage true ს შემთხევასი ახდენს გაგზავნილი რექვესთის localStorage ში შენახვას
 * @return {*} 
 */
export function CacheQuery(saveInLocalStorage: boolean = false) {
    const cache: Record<string, any> = {}
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        let originalMethod: Function | any = descriptor.value;
        if (!(originalMethod instanceof Function)) { return }

        const getValue = (thisArg: PropertyDescriptor, saveKey: string, args: any[]) => {
            if (cache[saveKey]) {
                return cache[saveKey]
            }
            const isAsyncFunction = originalMethod.constructor.name === 'AsyncFunction'
            const result = originalMethod.bind(thisArg)(...args)

            if (isAsyncFunction) {
                return result.then((result: any) => (cache[saveKey] = result))
            } else {
                return (cache[saveKey] = result)
            }
        }

        descriptor.value = function (...args: any[]) {
            const saveKey = objectToString(args)
            let returnValue = cache[saveKey]
            if (saveInLocalStorage) {
                try {
                    returnValue = JSON.parse(localStorage.getItem(saveKey)!)
                } catch (error) {
                    returnValue = getValue(this, saveKey, args)
                }
            } else {
                returnValue = getValue(this, saveKey, args)
            }
            return returnValue

        };
        return descriptor;
    };
}