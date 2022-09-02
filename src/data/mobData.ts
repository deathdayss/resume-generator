import { makeAutoObservable } from "mobx";

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

export const pdfViewOpen = new BooleanState(true);
export const resizableState = new ResizableState();