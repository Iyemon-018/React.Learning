import { ChangeEvent } from "react";

/**
 * チェック状態が変更されたときのチェックボックスの状態を定義します。
 */
export type CheckboxChangedArgs = {
    /**
     * 変更されたチェックボックスのラベルの値です。
     */
    name: string;

    /**
     * 変更後の値です。
     */
    selected: boolean;
}

/**
 * チェック状態が変更されたときに呼ばれるイベントを定義します。
 */
export type CheckboxChangedEvent = (value: CheckboxChangedArgs) => void;

/**
 * CheckBoxField のプロパティを定義します。
 * @see {CheckBoxField}
 */
export type CheckBoxFieldProps = {
    /**
     * 表示用のラベルに出力する値です。
     */
    name: string;

    /**
     * チェック状態が変更されたときに呼ばれるイベントです。
     */
    onChanged: (name: string, checked: boolean) => void;
}

/**
 * チェックボックスの入力フィールド コンポーネントです。
 * @param param
 * @returns チェックボックス コンポーネント
 */
export const CheckBoxField = (props: CheckBoxFieldProps) => {
    function handleChangeda(e: ChangeEvent<HTMLInputElement>): void {
        props.onChanged(props.name, e.target.checked);
    }

    return (
        <div className="checkbox-container">
            <label>
                <input type="checkbox"
                    defaultChecked={false}
                    onChange={(e) => handleChangeda(e)} />
                {props.name}
            </label>
        </div>
    );
}
