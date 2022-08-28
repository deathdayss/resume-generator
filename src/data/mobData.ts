import { action, makeAutoObservable, makeObservable, observable } from "mobx";

class ResizableState {
    useDragging = false
    width = (window.innerWidth - 20) / 2

    constructor() {
        makeAutoObservable(this);
    }

    set setUseDragging(arg: boolean) {
        this.useDragging = arg;
    }

    set setWidth(arg: number) {
        this.width = arg;
    }
}

class BooleanState {
    state;
    param: any = {};

    constructor(state: boolean = false) {
        makeAutoObservable(this);
        this.state = state;
    }


    set setState(arg: boolean) {
        this.state = arg;
    }

    toggleState() {
        this.state = !this.state;
    }
}

export class MobArray<T> {
    @observable arr

    constructor(arr: T[] = []) {
        this.arr = arr;
        makeObservable(this);
    }

    @action
    changeIndexFromTo(oldIndex: number, newIndex: number) {
        if (oldIndex === newIndex) {
            return;
        }
        const newArr = [];
        const minIndex = Math.min(oldIndex, newIndex);
        const maxIndex = Math.max(oldIndex, newIndex);
        for (let i = 0; i < this.arr.length; ++i) {
            let nextPush;
            if (i < minIndex || i > maxIndex) {
                nextPush = this.arr[i];
            }
            else if (i === newIndex) {
                nextPush = this.arr[oldIndex];
            }
            else if (i >= minIndex) {
                nextPush = this.arr[oldIndex <= newIndex ? i + 1 : i - 1];
            }
            if (nextPush !== undefined) {
                newArr.push(nextPush);
            }
            else {
                throw new Error("changeIndex undefined nextPush");
            }
        }
        this.arr = newArr;
    }

    @action
    delete(index: number) {
        this.arr.splice(index, 1);
    }
}

export const PdfViewOpen = new BooleanState(true);
export const resizableState = new ResizableState();