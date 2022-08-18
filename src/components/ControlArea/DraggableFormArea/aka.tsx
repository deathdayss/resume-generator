import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { arrayMove, SortableContainer, SortableContainerProps, SortableElement, SortableElementProps } from 'react-sortable-hoc';

const SortableItem: React.ComponentClass<SortableElementProps & { value: string }, any> = SortableElement(({ value }: { value: string }) =>
    <li>{value}</li>
);

const SortableList: React.ComponentClass<SortableContainerProps & { items: string[] }, any> = SortableContainer(({ items }: { items: string[] }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

class SortableComponent extends React.Component<{}, { items: string[] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        }
    }
    public render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
    private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };
}