

/**
 * გვიბრუნებს უნიკალურ ქეის ნებისმიერი მნიშვნელობისთვის 
 * @param {*} anyDataType შეიძლება იყოს ნებისმიერი ტიპი
 * @return {*}  {string}
 */
export const objectToString = (anyDataType: any): string => {
    if (anyDataType instanceof Array) {
        return JSON.stringify(anyDataType.map((item: any) => objectToString(item)).sort())
    } else if (anyDataType instanceof Object) {
        return JSON.stringify(Object.keys(anyDataType).sort()
            .reduce((acc: any, key: string) => {
                acc[key] = objectToString((anyDataType as any)[key])
                return acc
            }, {}))

    }
    return String(anyDataType)
}
