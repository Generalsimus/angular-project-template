
/** 
 * @generic FullPartial ხდის არასავალდებულო ობიექტის ფროფერთის როგორჩ მშობელ ობიექტს ისე შვილობილ ოიექტებს
 */
export type FullPartial<T> = {
    [P in keyof T]?: T[P] extends object ? FullPartial<T[P]> : T[P]
}