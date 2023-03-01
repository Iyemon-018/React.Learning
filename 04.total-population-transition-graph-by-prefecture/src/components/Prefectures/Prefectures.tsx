import { CheckBoxField } from "../CheckboxFields";

/**
 * 都道府県の持つ現在の状態を定義します。
 */
export type Prefecture = {
    /**
     * 都道府県コードです。この値は REST API のやり取りに使用します。
     */
    code: number;

    /**
     * 都道府県の名称です。この値は表示用に使用します。
     */
    name: string;

    /**
     * この都道府県が選択されているかどうかを示します。
     * true: 選択中, false: 未選択
     */
    selected: boolean;
}

export type Nationalwide = {
    values: Prefecture[];
}

export type PrefecturesChangedEvent = (chaned: Prefecture) => void;

/**
 * @see {Prefectures}
 */
export type PrefecturesProps = {
    /**
     * 都道府県の選択状態が変更されたときに呼ばれるイベントです。
     */
    onPrefectureChanged: PrefecturesChangedEvent;
}

/**
 * 各都道府県を選択可能なグリッドパネルのコンポーネントです。
 * すべての都道府県のチェックボックスを表示して、チェックの ON / OFF を切り替えることが出来ます。
 * 
 * @returns 都道府県別の選択肢を表示するためのコンポーネントです。
 */
export const Prefectures = (props: PrefecturesProps) => {

    function handleChanged(name: string, checked: boolean): void {
        props.onPrefectureChanged({
            name: name,
            selected: checked,
            code: 0,
        });
    }

    return (
        <div>
            <span>都道府県</span>
            <CheckBoxField name={"北海道"} onChanged={(name, checked) => handleChanged(name, checked)} />
        </div>
    );
}