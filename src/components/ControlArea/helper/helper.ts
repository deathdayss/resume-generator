export const changeIndex = (arr: any[], oldIndex: number, newIndex: number) => {
    const newArr: any[] = [];
    const minIndex = Math.min(oldIndex, newIndex);
    const maxIndex = Math.max(oldIndex, newIndex);
    for (let i = 0; i < arr.length; ++i) {
        if (i < minIndex || i > maxIndex) {
            newArr.push(arr[i]);
        }
        else if (i === newIndex) {
            newArr.push(arr[oldIndex])
        }
        else if (i >= minIndex) {
            newArr.push(arr[oldIndex <= newIndex ? i + 1 : i - 1])
        }
    }
    return newArr;
}

export const pushElement = <T>(arr: T[], element: T) => {
    const newArr = [...arr];
    newArr.push(element)
    return newArr;
}

export const deleteByElement = <T>(arr: T[], element: T) => {
    return arr.filter(elem => elem !== element);
}