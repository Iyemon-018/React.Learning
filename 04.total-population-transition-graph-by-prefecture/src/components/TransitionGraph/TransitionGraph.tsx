import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { TotalPopulationAggregate } from "../../types/prefecture";

type TransitionGraphProps = HighchartsReact.Props & {
    aggregates: TotalPopulationAggregate[];
}

export const TransitionGraph = (props: TransitionGraphProps) => {
    const componentRef = useRef<HighchartsReact.RefObject>(null);
    // props の総人口データが親コンポーネントから書き換えられるので useState にする必要はない。
    // props が変更されるたびに series を書き換えることでグラフが動的に変更されるようになる。
    const chartOptions = {
        title: {
            text: ""
        },
        chart: {
            type: "line"
        },
        xAxis: {
            categories: [] as string[],
            title: {
                text: "年度"
            },
            tickInterval: 5,
        },
        series: [
            { name: "no.1", data: [] as number[][] }
        ],
    }

    // プロットしたデータのラベルは以下の方法でフォーマットする必要がある。
    // 上記のオプション設定では出来ない。
    // それぞれ千の位ごとにカンマ区切りするように設定している。
    Highcharts.setOptions({
        yAxis: {
            title: {
                text: "人口数"
            },
            labels: {
                formatter: function (): string {
                    return Highcharts.numberFormat(Number(this.value), 0, '.', ',');
                }
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function (): string {
                        return Highcharts.numberFormat(Number(this.y), 0, '.', ',');
                    }
                },
                enableMouseTracking: true,
            }
        },
        // ツールチップで表示するプロットデータ
        tooltip: {
            formatter: function (): string {
                return `${this.x}年: ${Highcharts.numberFormat(Number(this.y), 0, '.', ',')} 人`;
            }
        }
    });

    chartOptions.series = props.aggregates
        .map(aggregate => {
            return {
                name: aggregate.prefName,
                data: aggregate.perYears.map(total => [total.year, total.value]),
            }
        });

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={componentRef}
                {...props} />
        </div>
    );
}