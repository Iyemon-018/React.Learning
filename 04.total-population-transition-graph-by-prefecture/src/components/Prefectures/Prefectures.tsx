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

    prefectures: Prefecture[];
}

/**
 * 各都道府県を選択可能なグリッドパネルのコンポーネントです。
 * すべての都道府県のチェックボックスを表示して、チェックの ON / OFF を切り替えることが出来ます。
 * 
 * @returns 都道府県別の選択肢を表示するためのコンポーネントです。
 */
export const Prefectures = (props: PrefecturesProps) => {

    function handleChanged(name: string, code: number, checked: boolean): void {
        props.onPrefectureChanged({
            name: name,
            selected: checked,
            code: code,
        });
    }

    return (
        <div>
            <span>都道府県</span>
            {props.prefectures.map(p => {
                return <CheckBoxField key={p.code}
                    name={p.name}
                    onChanged={(name, checked) => handleChanged(name, p.code, checked)} />
            })}
        </div>
    );
}