export const bodyRequiredValidator = (body: any, fields: string[]): object | undefined => {
    let required: string[] = []
    fields.forEach((key) => {
        if ([undefined, '', null].includes(body[key])) {
            required.push(key)
        }
    })
    return required.length ? { "missing": required } : undefined
}

export const objectSanitizer = (obj: object | any) => {
    Object.keys(obj).forEach((key) => [undefined, '', null].includes(obj[key]) && delete obj[key])
    return obj
}