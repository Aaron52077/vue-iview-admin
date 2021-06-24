<template>
  <div class="gc-panel">
    <div class="gc-panel__title">Calculator 贷款计算器</div>
    <sDivider></sDivider>
    <div class="gc-container gc-loan">
      <sRow :gutter="16">
        <sCol span="12" class="gc-loan__bd">
          <sForm ref="formValidate" :model="formObj" :rules="ruleValidate" :label-width="120">
            <sFormItem label="贷款方式" prop="style">
              <Select v-model="formObj.style" placeholder="请选择贷款方式">
                <Option value="0">商业贷款</Option>
                <Option value="1">公积金贷款</Option>
                <Option value="2">组合贷款</Option>
              </Select>
            </sFormItem>
            <sFormItem label="贷款总额" prop="money">
              <sRow>
                <sCol span="12">
                  <sInputNumber
                    class="gc-loan__input"
                    :min="1"
                    :max="9999"
                    v-model="formObj.money"
                    placeholder="请输入贷款总额"
                  /><span>万(商业)</span>
                </sCol>
                <sCol span="12" v-show="formObj.style === '2'">
                  <sInputNumber
                    class="gc-loan__input"
                    :min="1"
                    :max="9999"
                    v-model="formObj.fundmoney"
                    placeholder="请输入贷款总额"
                  /><span>万(公积金)</span>
                </sCol>
              </sRow>
            </sFormItem>
            <sFormItem label="还款方式" prop="type">
              <Select v-model="formObj.type" placeholder="请选择还款方式">
                <Option value="0">等额本息</Option>
                <Option value="1">等额本金</Option>
              </Select>
            </sFormItem>
            <sFormItem label="按揭年数" prop="year">
              <Select v-model="formObj.year" placeholder="请选择按揭年数">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{
                  item.key
                }}</Option>
              </Select>
            </sFormItem>
            <sFormItem label="首次还款日期" prop="date">
              <sDatePicker type="date" placeholder="请选择首次还款日期" v-model="formObj.date" />
            </sFormItem>
            <sFormItem label="贷款利率（%）" prop="rata">
              <template v-if="formObj.style === '0'">
                <sInputNumber
                  class="gc-loan__input"
                  :min="0"
                  :max="100"
                  placeholder="请输入商业贷款利率"
                  v-model="formObj.rate1"
                />
                <span>%（商业贷款）</span>
              </template>
              <template v-if="formObj.style === '1'">
                <sInputNumber
                  class="gc-loan__input"
                  :min="0"
                  :max="100"
                  placeholder="请输入公积金贷款利率"
                  v-model="formObj.rate2"
                />
                <span>%（公积金贷款）</span>
              </template>
              <template v-if="formObj.style === '2'">
                <sInputNumber
                  class="gc-loan__input"
                  :min="0"
                  :max="100"
                  placeholder="请输入组合贷款利率"
                  v-model="formObj.rate3"
                />
                <span>%（商业贷款）</span>
                <sInputNumber
                  class="gc-loan__input"
                  :min="0"
                  :max="100"
                  placeholder="请输入组合贷款利率"
                  v-model="formObj.rate4"
                />
                <span>%（公积金贷款）</span>
              </template>
            </sFormItem>
            <sFormItem>
              <sButton type="primary" @click="handleSubmit('formValidate')">开始计算</sButton>
            </sFormItem>
          </sForm>
        </sCol>
        <sCol span="12" class="gc-loan__result">
          <mScrollbar>
            <sTimeline>
              <sTimelineItem color="green">
                <sIcon type="ios-trophy" slot="dot"></sIcon>
                <span>贷款计算结果</span>
                <template v-if="results.timeDate">
                  <div class="result-item">每月还款: {{ (results || {}).every || 0 }}元</div>
                  <div v-show="results.overBasic">
                    每月递减: {{ (results || {}).overBasic || 0 }}元
                  </div>
                  <div class="result-item">还款总额: {{ results.total }}万</div>
                  <div class="result-item">贷款总额: {{ results.basic }}万</div>
                  <div class="result-item">按揭年数: {{ results.year }}年</div>
                  <div class="result-item">支付利息: {{ results.profit }}万</div>
                </template>
              </sTimelineItem>
              <sTimelineItem v-for="(item, index) in results.timeDate" :key="index">
                <p>
                  {{ item.monthName }}：<span
                    >{{ formObj.type === '0' ? '本金' : '月供' }}：{{ item.mouthBasic }}元</span
                  >，<span>利息：{{ item.mouthProfit }}元</span>，
                  <span>本期剩余：{{ item.leftFund }}元</span>
                </p>
              </sTimelineItem>
            </sTimeline>
          </mScrollbar>
        </sCol>
      </sRow>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Select, Option } from 'view-design';

export default {
  data() {
    return {
      formObj: {
        style: '0',
        type: '0',
        money: 50,
        fundmoney: 20,
        year: '20',
        date: this.dataBase.unixToStr(new Date().getTime(), 'yyyy-MM-dd'),
        rate1: 4.75,
        rate2: 3.25,
        rate3: 4.75,
        rate4: 3.25
      },
      yearList: [
        {
          key: '5年（60月）',
          value: '5',
          mouth: '60'
        },
        {
          key: '10年（120月）',
          value: '10',
          mouth: '120'
        },
        {
          key: '15年（180月）',
          value: '15',
          mouth: '180'
        },
        {
          key: '20年（240月）',
          value: '20',
          mouth: '240'
        },
        {
          key: '25年（300月）',
          value: '25',
          mouth: '300'
        },
        {
          key: '30年（360月）',
          value: '30',
          mouth: '360'
        }
      ],
      ruleValidate: {
        style: [{ required: true, message: '请选择贷款方式', trigger: 'change' }],
        type: [{ required: true, message: '请选择贷款方式', trigger: 'change' }],
        money: [{ required: true, type: 'number', message: '请输入贷款总额', trigger: 'blur' }],
        year: [{ required: true, message: '请选择按揭年数', trigger: 'change' }],
        date: [{ required: true, type: 'date', message: '请选择首次还款日期', trigger: 'change' }]
      },
      results: {}
    };
  },
  methods: {
    businessRateChange(event) {
      const { value } = event.mp.detail;
      this.businessObj.rate = value;
    },
    fundRateChange(event) {
      const { value } = event.mp.detail;
      this.fundObj.rate = value;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const nowMouth = new Date(this.formObj.data).getMonth();
          let resultInfo, iv;
          const mouthVal = this.yearList.find(item => item.value === this.formObj.year).mouth;
          const iv1 = this.hasDefVal(this.formObj.rate1, '0.049');
          const iv2 = this.hasDefVal(this.formObj.rate2, '0.0325');
          const iv3 = this.hasDefVal(this.formObj.rate3, '0.049');
          const iv4 = this.hasDefVal(this.formObj.rate4, '0.0325');
          if (this.formObj.style === '0' || this.formObj.style === '1') {
            iv = this.formObj.style === '0' ? iv1 : iv2;
            if (this.formObj.type === '0') {
              resultInfo = this.calculateProfit(
                this.formObj.money,
                this.formObj.year,
                mouthVal,
                nowMouth,
                iv
              );
            }
            if (this.formObj.type === '1') {
              resultInfo = this.calculateBasic(
                this.formObj.money,
                this.formObj.year,
                mouthVal,
                nowMouth,
                iv
              );
            }
          } else {
            resultInfo = this.calculateGroup(
              this.formObj.money,
              this.formObj.fundmoney,
              this.formObj.year,
              mouthVal,
              nowMouth,
              iv3,
              iv4
            );
          }
          this.results = { ...resultInfo };
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    hasDefVal(val1, val2) {
      return val1
        ? parseFloat(val1 / 100)
            .toFixed(4)
            .toString()
        : val2;
    },
    /**
     * 等额本息
     * 每月月供额 =〔贷款本金 × 月利率 × (1 ＋ 月利率)＾还款月数〕÷〔(1 ＋ 月利率)＾还款月数 - 1〕
     */
    calculateProfit(num, year, mouth, time, iv) {
      let mouthIV = parseFloat(iv) / 12,
        basicNum = parseFloat(num) * 10000,
        mouths = parseInt(mouth);
      // 每月月供
      const mouthLoan =
        (basicNum * mouthIV * Math.pow(1 + mouthIV, mouths)) / (Math.pow(1 + mouthIV, mouths) - 1);
      // 总利息 = 还款月数×每月月供额 - 贷款本金
      const totalProfit = mouth * mouthLoan - basicNum;
      // 还款总额 = 总利息 + 贷款本金
      let totalPrice = totalProfit + basicNum,
        leftFund = totalProfit + basicNum;
      // 循环月份
      let mouthDate = [],
        nowMouth = time || new Date().getMonth(),
        realMonth = 0;
      for (let i = 1; i <= mouths; i++) {
        realMonth = nowMouth + i;
        let yearlist = Math.floor(i / 12);

        realMonth = realMonth - 12 * yearlist;

        if (realMonth > 12) {
          realMonth = realMonth - 12;
        }
        // 每月应还利息 = 贷款本金 × 月利率 ×〔(1 + 月利率)^还款月数 - (1 + 月利率)^(还款月序号 - 1)〕÷〔(1+月利率)^还款月数 - 1〕
        const mouthProfit =
          (basicNum * mouthIV * (Math.pow(1 + mouthIV, mouths) - Math.pow(1 + mouthIV, i - 1))) /
          (Math.pow(1 + mouthIV, mouths) - 1);
        // 每月应还本金 = 贷款本金 × 月利率 × (1 + 月利率)^(还款月序号 -1 ) ÷〔(1 + 月利率)^还款月数 - 1〕
        const mouthBasic =
          (basicNum * mouthIV * Math.pow(1 + mouthIV, i - 1)) / (Math.pow(1 + mouthIV, mouths) - 1);
        leftFund = leftFund - (mouthProfit + mouthBasic);
        if (leftFund < 0) {
          leftFund = 0;
        }
        mouthDate[i - 1] = {
          monthName: realMonth + '月',
          mouthProfit: mouthProfit.toFixed(2),
          mouthBasic: mouthBasic.toFixed(2),
          leftFund: leftFund.toFixed(2) // 剩余还款
        };
      }
      return {
        every: mouthLoan.toFixed(2),
        profit: (totalProfit / 10000).toFixed(2),
        total: (totalPrice / 10000).toFixed(2),
        timeDate: mouthDate,
        basic: num,
        year: year
      };
    },
    /**
     * 等额本金
     */
    calculateBasic(num, year, mouth, time, iv) {
      let mouthIV = parseFloat(iv) / 12,
        basicNum = parseFloat(num) * 10000,
        mouthBasic = 0, // 首月还款已还本金金额是0
        mouths = parseInt(mouth);
      // 每月应还本金 = 贷款本金 ÷ 还款月数
      let basicMouth = basicNum / mouths;
      // 每月月供额 = (贷款本金÷还款月数) + (贷款本金 - 已归还本金累计额) × 月利率
      let mouthLoan = basicMouth + (basicNum - mouthBasic) * mouthIV;
      // 每月月供递减额 = 每月应还本金 × 月利率 = 贷款本金 ÷ 还款月数 × 月利率
      let mouthLoanOver = basicMouth * mouthIV;
      // 总利息 =〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
      let totalProfit =
        ((basicMouth + basicNum * mouthIV + (basicNum / mouths) * (1 + mouthIV)) / 2) * mouths -
        basicNum;
      //还款总额 总利息+贷款本金
      let totalPrice = totalProfit + basicNum,
        leftFund = totalProfit + basicNum;
      // 循环月份
      let mouthDate = [],
        nowMouth = time || new Date().getMonth(),
        nowYear = new Date().getFullYear(),
        realMonth = 0;
      for (let i = 1; i <= mouth; i++) {
        realMonth = nowMouth + i;
        let yearlist = Math.floor(i / 12);
        realMonth = realMonth - 12 * yearlist;
        if (realMonth > 12) {
          realMonth = realMonth - 12;
        }
        mouthBasic = basicMouth * (i - 1);
        let mouthBasicOver = basicMouth + (basicNum - mouthBasic) * mouthIV;
        // 每月应还利息 = 剩余本金 × 月利率 = (贷款本金 - 已归还本金累计额) × 月利率
        let mouthProfit = (basicNum - mouthBasic) * mouthIV;
        leftFund = leftFund - mouthBasic;
        if (leftFund < 0) {
          leftFund = 0;
        }
        mouthDate[i - 1] = {
          monthName: realMonth + '月',
          mouthProfit: mouthProfit.toFixed(2),
          mouthBasic: mouthBasicOver.toFixed(2), // 每月本金
          leftFund: leftFund.toFixed(2) // 剩余还款
        };
      }
      return {
        every: mouthLoan.toFixed(2),
        profit: (totalProfit / 10000).toFixed(2),
        total: (totalPrice / 10000).toFixed(2),
        overBasic: mouthLoanOver.toFixed(2),
        timeDate: mouthDate,
        basic: num,
        year: year
      };
    },
    /**
     *  组合贷款计算
     */
    calculateGroup(num1, num2, year, mouth, time, iv1, iv2) {
      let profitObj = this.calculateProfit(num1, year, mouth, time, iv1);
      let basicObj = this.calculateBasic(num2, year, mouth, time, iv2);
      // 处理混合贷款的月供数据
      let mergeTimeDate = profitObj.timeDate.map((item, index) => {
        return {
          monthName: item.monthName,
          mouthProfit: Number(
            parseFloat(item.mouthProfit) + parseFloat(basicObj.timeDate[index].mouthProfit)
          ).toFixed(2),
          mouthBasic: Number(
            parseFloat(item.mouthBasic) + parseFloat(basicObj.timeDate[index].mouthBasic)
          ).toFixed(2),
          leftFund: Number(
            parseFloat(item.leftFund) + parseFloat(basicObj.timeDate[index].leftFund)
          ).toFixed(2)
        };
      });
      return {
        every: Number(parseFloat(profitObj.every) + parseFloat(basicObj.every)).toFixed(2),
        profit: Number(parseFloat(profitObj.profit) + parseFloat(basicObj.profit)).toFixed(2),
        total: Number(parseFloat(profitObj.total) + parseFloat(basicObj.total)).toFixed(2),
        timeDate: mergeTimeDate,
        overBasic: basicObj.overBasic,
        basic: Number(parseFloat(num1) + parseFloat(num2)).toFixed(2),
        year: year
      };
    }
  },
  components: { Select, Option }
};
</script>

<style lang="less">
.gc-loan {
  &__bd {
    min-height: 600px;
  }
  &__result {
    height: 600px;
  }
  &__input {
    width: 150px;
    & + span {
      margin: 0 10px;
    }
  }
}
</style>
