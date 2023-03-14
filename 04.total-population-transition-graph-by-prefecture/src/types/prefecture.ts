
/**
 * 都道府県の持つ現在の状態を定義します。
 */
export interface Prefecture {
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

/**
 * 選択可能な都道府県の情報を定義するクラスです。
 * このクラスはチェックボックスで都道府県を表現する目的で使用します。
 */
export class PrefectureValue implements Prefecture {

    constructor(code: number, name: string) {
        this.code = code;
        this.name = name;
        this.selected = false;
    }

    /**
     * 都道府県コードを設定、または取得します。
     */
    code: number;

    /**
     * 都道府県の名称を設定、または取得します。
     */
    name: string;

    /**
     * 現在の選択状態を設定、または取得します。
     */
    selected: boolean;
}

export type Nationalwide = {
    values: Prefecture[];
}

/**
 * 1年あたりの人口推移量を定義するクラスです。
 */
export class TotalPopulationPerYear {

    constructor(year: number, value: number) {
        this.year = year;
        this.value = value;
    }

    /**
     * この情報が記録されている年数を設定、または取得します。
     */
    year: number;

    /**
     * この年の人口推移を設定、または取得します。
     */
    value: number;
}

/**
 * 都道府県の総人口を集計した情報を定義するクラスです。
 * ここにはある1つの都道府県における5年ごとの人口推移の情報を保持します。
 */
export class TotalPopulationAggregate {

    constructor(prefCode: number, prefName: string, perYears: TotalPopulationPerYear[]) {
        this.prefCode = prefCode;
        this.prefName = prefName;
        this.perYears = perYears;
    }

    /**
     * 都道府県コードを設定、または取得します。
     */
    prefCode: number;

    /**
     * 都道府県の名称を設定、または取得します。
     */
    prefName: string;

    /**
     * 5年ごとの人口推移を設定、または取得します。
     * 1要素に付き1年の情報を保持します。
     * 人口推移の情報は5年ごとに集計する想定のため、すべての年数の情報が存在するわけではありません。
     */
    perYears: TotalPopulationPerYear[];
}
