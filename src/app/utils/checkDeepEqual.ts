import { FullPartial } from "../interface/generics";

/**check
* ამოწმებს ობიექტის რომელიმე ფგროფერთი ან ფროფერთის შვილობილი ფროფერთი თუ არის იგევე
* ლოკაციაზე სადც findObject ის ფროფერთი  და აქვთ იგივე მნიშვნელობა
* 
* @param {T} object ჩაეწოდება ნებისმიერი ობიექტი 
* @param {FullPartial<T>} findObject არის ობიექტი რომლის რომელიმე ფროფერთი შესაძლოა ტოლი იყოს object ის რომელიმე ფროფერთის
* @return {boolean}  აბრუნებს true იმ შემთხვევაში თუ findObject ს რომელიმე ფოროფერთი ტოლია object ის რომელიმე ფროფერთის
*/
export const checkDeepEqual = <T>(object: T, findObject: FullPartial<T>): boolean => {
    let defaultValue = true;
    for (const prop in findObject) {
        const findValue = findObject[prop]
        const realValue = object[prop]
        
        if (findValue === realValue) {
            return true;
        } else if (typeof realValue === "object" && typeof findValue === 'object') {
            defaultValue = checkDeepEqual(realValue, findValue!)
        }
        defaultValue = false
    }
    return defaultValue
}

