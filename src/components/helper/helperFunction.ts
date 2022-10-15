export const produceItemWithId = (prefix = 'id-') => {
    return prefix + Math.random() * Date.now()
}