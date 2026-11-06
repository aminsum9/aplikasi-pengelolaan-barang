'use client';

import { useState } from 'react';

interface Item {
    value: string
    name: string
}

interface FilterDropdownProps {
    defaultItem: string
    items: Item[]
    selectedItem: string
    selectItem: (item: string) => void
    classes: string | null
}

// interface Product {
//   id: number;
//   name: string;
//   category: string;
// }


export default function FilterDropdown({ defaultItem, items, selectItem, selectedItem, classes = "" }: FilterDropdownProps) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    //   const filteredProducts =
    //     selectedCategory === 'Semua'
    //       ? products
    //       : products.filter(
    //           (product) => product.category === selectedCategory
    //         );

    return (
        <div className={" " + classes}>
            <div className="mb-3" style={{ maxWidth: '250px' }}>
                <select
                    className="form-select"
                    value={selectedItem}
                    onChange={(e) => selectItem(e.target.value)}
                >
                    <option key={1} value="">{defaultItem}</option>
                    {items.map((item,index) =>
                        <option key={1+index} value={item.value}>{item.name}</option>
                    )}
                </select>
            </div>
        </div>
    );
}