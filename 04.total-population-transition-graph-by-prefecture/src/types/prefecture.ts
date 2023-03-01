
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
