import { Prefecture } from "../../types/prefecture";
import { CheckBoxField } from "../ui/CheckboxFields";

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