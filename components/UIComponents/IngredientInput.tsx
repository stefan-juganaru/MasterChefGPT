import React, {ChangeEvent} from 'react';

interface IngredientInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IngredientInput = React.memo(({ value, onChange }: IngredientInputProps) => {
    return (
        <input
            type="text"
            placeholder="Type ingredient"
            className="input input-bordered w-full"
            value={value}
            onChange={onChange}
        />
    );
});

IngredientInput.displayName = 'IngredientInput';

export default IngredientInput;