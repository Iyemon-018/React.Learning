import { useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// デバッグ用の Highcharts を表示するためのコンポーネントです。
// cf. https://www.npmjs.com/package/highcharts-react-official
// HighchartsReact は React 用の Highcharts コンポーネントです。
// 
export const DebugHighchart01 = (props: HighchartsReact.Props) => {
    const componentRef = useRef<HighchartsReact.RefObject>(null);

    /**
     * chat のオプションです。
     * Highcharts ではグラフに設定するオプションはすべてこの SeriesOptionsType インターフェースに定義しています。
     * オプション自体を state にしておくことで、series が追加、削除されたり
     * X軸、Y軸が変化したときにインタラクティブにチャートが更新される。
     * Highcharts for React では、このような Hooks を使った手法を推奨している。
     * 
     * ここのオプションは以下の Demo を参考にしている。
     * cf. https://www.highcharts.com/demo/line-labels
     */
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: "line"
        },
        series: [
            { name: "no.1", data: [1, 2, 3] }
        ],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            }
        },
    });

    function handleClick(): void {
        const newSeries = [...chartOptions.series,
        { name: "no.2", data: [2, 3, 4] }
        ];
        setChartOptions({ ...chartOptions, series: newSeries });
    }

    // highcharts と ref プロパティは以下の HighchartsReact に Highcharts の
    // インスタンスを渡すために必要になるらしい。
    // なぜインスタンスを渡す必要があるのかはよくわからない。
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={componentRef}
                {...props} />
            <button onClick={() => handleClick()}>追加</button>
        </div>
    );
}