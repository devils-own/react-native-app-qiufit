/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var API = require('../../api');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;
import ExNavigator from '@exponent/react-native-navigator';
var Router = require('../router');
import UserStore from '../../stores/UserStore';

import Storage from 'react-native-storage';
import osUtils from '../../utils';
var I18n = require('react-native-i18n');

I18n.fallbacks = true;

const Hans = {
  login: '登錄',
  'please_input_phone_number': '請輸入手機號碼',
  'phone_number': '手機號',
  'next': '下一步',
  'accept': '點擊下一步按鈕，即表示你同意',
  'license': '《囚徒健身軟件許可及服務協議》',
  'pushUp': '俯臥撐',
  'deep': '深蹲',
  'pullUp': '引體向上',
  'leg': '舉腿',
  'bridge': '橋',
  'handstand': '倒立撐',
  'primary': '初級標準',
  'intermediate': '中級標準',
  'advanced': '高級標準',
  'ccpro': '專業囚徒健身',
  'analytics': '訓練分析',
  'record': '訓練記錄',
  'finish_turning': '個人完成該訓練',
  'comments': ' 條評論',
  'comment': '寫評論',
  'complete': '完成!',
  'skip': '隨便看看',
  'training': '訓練動態',
  'new_record': '新動作!',
  'level': '標準',
  'action': '動作',
  'group': '組',
  'share': '分享',
  'post': '发布',
  'ban_msg': '不友善的言論會被刪除，深度討論會被優先展示。',
  'mon': '一',
  'tue': '二',
  'wed': '三',
  'thu': '四',
  'fri': '五',
  'sat': '六',
  'sun': '日',
  'year': '年',
  'month': '月',
  'start': '開始！',
  'nextstep': '然後開始下一式',
  'goal': '逐步做到',
  'side': '(每側)',
  'final_goal': '最終耐力',
  '_1s10': '1組, 10次',
  '_1s1': '1組, 1次',
  '_1s2': '1組, 2次',
  '_1s3': '1組, 3次',
  '_1s4': '1組, 4次',
  '_1s5': '1組, 5次',
  '_1s6': '1組, 6次',
  '_1s8': '1組, 8次',
  '_1s25': '1組, 25次',
  ' _1s100': '1組, 100次',
  '_2s2': '2組, 2次',
  '_2s3': '2組, 3次',
  '_2s5': '2組, 5次',
  '_2s4': '2組, 4次',
  '_2s6': '2組, 6次',
  '_2s7': '2組, 7次',
  '_2s8': '2組, 8次',
  '_2s9': ' 2組, 9次',
  '_2s10': '2組, 10次',
  '_2s12': '2組, 12次',
  '_2s15': '2組, 15次',
  '_2s20': '2組, 20次',
  '_2s25': '2組, 25次',
  '_2s30': '2組, 30次',
  '_2s35': '2組, 35次',
  '_2s50': '2組, 50次',
  '_3s10': '3組, 10次',
  '_3s20': '3組, 20次',
  '_3s25': '3組, 25次',
  '_3s30': '3組, 30次',
  '_3s35': '3組, 35次',
  '_3s40': '3組, 40次',
  '_3s50': '3組, 50次',
  '_4s40': '4組, 40次',
  ' _10s': '10秒',
  '_30s': '30秒',
  '_1m': '1分鐘',
  '_2m': '2分鐘',
  '_1_1': "第一式牆壁俯臥撑",
  '_1_2': "第二式上斜俯臥撑",
  '_1_3': "第三式膝蓋俯臥撑",
  '_1_4': "第四式半俯臥撑",
  '_1_5': "第五式標準俯臥撑",
  '_1_6': "第六式窄距俯臥撑",
  '_1_7': "第七式偏重俯臥撑",
  '_1_8': "第八式單臂半俯臥撑",
  '_1_9': "第九式槓桿俯臥撑",
  '_1_10': "最終式單臂俯臥撑",
  '_2_1': "第一式肩倒立深蹲",
  '_2_2': "第二式折刀深蹲",
  '_2_3': "第三式支撐深蹲",
  '_2_4': "第四式半深蹲",
  '_2_5': "第五式標準深蹲",
  '_2_6': "第六式窄距深蹲",
  '_2_7': "第七式偏重深蹲",
  '_2_8': "第八式單腿半深蹲",
  '_2_9': "第九式單腿輔助深蹲",
  '_2_10': "最終式單腿深蹲",
  '_3_1': "第一式垂直引體",
  '_3_2': "第二式水平引體向上",
  '_3_3': "第三式折刀引體向上",
  '_3_4': "第四式半引體向上",
  '_3_5': "第五式標準引體向上",
  '_3_6': "第六式窄距引體向上",
  '_3_7': "第七式偏重引體向上",
  '_3_8': "第八式單臂半引體向上",
  '_3_9': "第九式單臂輔助引體向上",
  '_3_10': "最終式單臂引體向上",
  '_4_1': "第一式坐姿屈膝",
  '_4_2': "第二式平臥抬膝",
  '_4_3': "第三式平臥屈舉腿",
  '_4_4': "第四式平臥蛙舉腿",
  '_4_5': "第五式平臥直舉腿",
  '_4_6': "第六式懸垂舉腿",
  '_4_7': "第七式懸垂屈舉腿",
  '_4_8': "第八式懸垂蛙舉腿",
  '_4_9': "第九式懸垂半舉腿",
  '_4_10': "最終式懸垂直舉腿",
  '_5_1': "第一式短橋",
  '_5_2': "第二式直橋",
  '_5_3': "第三式高低橋",
  '_5_4': "第四式頂橋",
  '_5_5': "第五式半橋",
  '_5_6': "第六式標準橋",
  '_5_7': "第七式下行橋",
  '_5_8': "第八式上行橋",
  '_5_9': "第九式合橋",
  '_5_10': "最終式鐵板橋",
  '_6_1': "第一式靠牆頂立",
  '_6_2': "第二式烏鴉式",
  '_6_3': "第三式靠牆倒立",
  '_6_4': "第四式半倒立撐",
  '_6_5': "第五式標準倒立撐",
  '_6_6': "第六式窄距倒立撐",
  '_6_7': "第七式偏重倒立撐",
  '_6_8': "第八式單臂半倒立撐",
  '_6_9': "第九式槓桿倒立撐",
  '_6_10': "最終式單臂倒立撐",
  'wechat_login':'微信登錄',
  'fb_login':'Facebook登錄',
  'phone_login':'手機登錄',
  'send_verify':'請稍後，你將會受到一條驗證碼短信',
  'finish':'完成',
  'you_phone':'您的手機號碼是',
  'v_code':'驗證碼',
  'send_again':'再發一次',
  'input_v_code':'輸入驗證碼',
  'times':'次'
};

I18n.translations = {
  'en': {
    login: 'Login',
    'please_input_phone_number': 'Please input phone number',
    'phone_number': 'Phone Number',
    'next': 'Next',
    'accept': 'Accept after click next button',
    'license': '《Qiu Fitness License》',
    'pushUp': 'Push Up',
    'deep': 'Squat',
    'pullUp': 'Pull Up',
    'leg': 'Leg Raise',
    'bridge': 'Bridge',
    'handstand': 'Handstand',
    'primary': 'Primary',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced',
    'ccpro': 'Convict Conditioning Pro',
    'analytics': 'Analytics',
    'record': 'Record',
    'finish_turning': ' peoples has completed',
    'comments': 'comments',
    'comment': 'comment',
    'complete': 'Completed!',
    'skip': 'Skip',
    'training': 'Training Trends',
    'new_record': 'Record!',
    'level': 'Step',
    'action': 'Action',
    'group': 'Set',
    'share': 'Share',
    'post': 'Post',
    'ban_msg': 'Unfriendly comments will be deleted , it shows the depth of discussion will be given priority .',
    'mon': 'Mon',
    'tue': 'Tue',
    'wed': 'Wed',
    'thu': 'Thu',
    'fri': 'Fri',
    'sat': 'Sat',
    'sun': 'Sun',
    'year': ' . ',
    'month': '',
    'start': 'Start!',
    'next_step': 'Then next step!',
    'goal': 'The goal is ',
    'side': '(each side)',
    'final_goal': 'The final goal is ',
    '_1s10': '1 set 10',
    '_1s1': '1 set 1',
    '_1s2': '1 set 2',
    '_1s3': '1 set 3',
    '_1s4': '1 set 4',
    '_1s5': '1 set 5',
    '_1s6': '1 set 6',
    '_1s8': '1 set 8',
    '_1s25': '1 set 25',
    '_1s100': '1 set 100',
    '_2s2': '2 set 2',
    '_2s3': '2 set 3',
    '_2s5': '2 set 5',
    '_2s4': '2 set 4',
    '_2s6': '2 set 6',
    '_2s7': '2 set 7',
    '_2s8': '2 set 8',
    '_2s9': '2 set 9',
    '_2s10': '2 set 10',
    '_2s12': '2 set 12',
    '_2s15': '2 set 15',
    '_2s20': '2 set 20',
    '_2s25': '2 set 25',
    '_2s30': '2 set 30',
    '_2s35': '2 set 35',
    '_2s50': '2 set 50',
    '_3s10': '3 set 10',
    '_3s20': '3 set 20',
    '_3s25': '3 set 25',
    '_3s30': '3 set 30',
    '_3s35': '3 set 35',
    '_3s40': '3 set 40',
    '_3s50': '3 set 50',
    '_4s40': '4 set 40',
    '_10s': '10 sec',
    '_30s': '30 sec',
    '_1m': '1 min',
    '_2m': '2 min',
    '_1_1': '1 Wall Pushups',
    '_1_2': '2 Incline Pushups',
    '_1_3': '3 Kneeling Pushups',
    '_1_4': '4 Half Pushups',
    '_1_5': '5 Full Pushups',
    '_1_6': '6 Close Pushups',
    '_1_7': '7 Uneven Pushups',
    '_1_8': '8 Half One-Arm Pushups',
    '_1_9': '9 Lever Pushups',
    '_1_10': '10 One-Arm Pushups',
    '_2_1': '1 Shoulderstand Squats',
    '_2_2': '2 Jackknife Squats',
    '_2_3': '3 Supported Squats',
    '_2_4': '4 Half Squats',
    '_2_5': '5 Full Squats',
    '_2_6': '6 Close Squats',
    '_2_7': '7 Uneven Squats',
    '_2_8': '8 Half One-Leg Squats',
    '_2_9': '9 Assisted One-Leg Squats',
    '_2_10': '10 One-Leg Squats',
    '_3_1': '1 Vertical Pulls',
    '_3_2': '2 Horizontal Pulls',
    '_3_3': '3 Jackknife Pullups',
    '_3_4': '4 Half Pullups',
    '_3_5': '5 Full Pullups',
    '_3_6': '6 Close Pullups',
    '_3_7': '7 Uneven Pullups',
    '_3_8': '8 Half One-Arm Pullups',
    '_3_9': '9 Assisted One-Arm Pullups',
    '_3_10': '10 One-Arm Pullups',
    '_4_1': '1 Knee Tucks',
    '_4_2': '2 Flat Knee Raises',
    '_4_3': '3 Flat Bent Leg Raises',
    '_4_4': '4 Flat Frog Raises',
    '_4_5': '5 Flat Straight Leg Raises',
    '_4_6': '6 Hanging Knee Raises',
    '_4_7': '7 Hanging Bent Leg Raises',
    '_4_8': '8 Hanging Frog Raises',
    '_4_9': '9 Partial Straight Raises',
    '_4_10': '10 Hanging Straight Leg Raises',
    '_5_1': '1 Short Bridges',
    '_5_2': '2 Straight Bridges',
    '_5_3': '3 Angled Bridges',
    '_5_4': '4 Head Bridges',
    '_5_5': '5 Half Bridges',
    '_5_6': '6 Full Bridges',
    '_5_7': '7 Wall Walking Bridges (Down)',
    '_5_8': '8 Wall Walking Bridges (Up)',
    '_5_9': '9 Closing Bridges',
    '_5_10': '10 Stand-to-Stand Bridges',
    '_6_1': '1 Wall Headstands',
    '_6_2': '2 Crow Stands',
    '_6_3': '3 Wall Handstands',
    '_6_4': '4 Half Handstand Pushups',
    '_6_5': '5 Handstand Pushups',
    '_6_6': '6 Close Handstand Pushups',
    '_6_7': '7 Uneven Handstand Pushups',
    '_6_8': '8 Half One-Arm Handstand Pushups',
    '_6_9': '9 Lever Handstand Pushups',
    '_6_10': '10 One-Arm Handstand Pushups',
    'wechat_login':'Log in with Wechat',
    'fb_login':'Log in with Facebook',
    'phone_login':'Login',
    'send_verify':'Please wait , you will receive a verification code message',
    'finish':'Finish',
    'you_phone':'You phone number is ',
    'v_code':'Verification code',
    'send_again':'Send again',
    'input_v_code':'Input Verification code',
    'times':' times'
  },
  'zh': {
    login: '登录',
    'please_input_phone_number': '请输入手机号码',
    'phone_number': '手机号',
    'next': '下一步',
    'accept': '点击下一步按钮，即表示你同意',
    'license': '《囚徒健身软件许可及服务协议》',
    'pushUp': '俯卧撑',
    'deep': '深蹲',
    'pullUp': '引体向上',
    'leg': '举腿',
    'bridge': '桥',
    'handstand': '倒立撑',
    'primary': '初级标准',
    'intermediate': '中级标准',
    'advanced': '高级标准',
    'ccpro': '专业囚徒健身',
    'analytics': '训练分析',
    'record': '训练记录',
    'finish_turning': '个人完成该训练',
    'comments': ' 条评论',
    'comment': '写评论',
    'complete': '完成!',
    'skip': '随便看看',
    'training': '训练动态',
    'new_record': '新纪录!',
    'level': '标准',
    'action': '动作',
    'group': '组',
    'share': '分享',
    'post': '发布',
    'ban_msg': '不友善的言论会被删除，深度讨论会被优先展示。',
    'mon': '一',
    'tue': '二',
    'wed': '三',
    'thu': '四',
    'fri': '五',
    'sat': '六',
    'sun': '日',
    'year': '年',
    'month': '月',
    'start': '开始！',
    'next_step': '然后开始下一式',
    'goal': '逐步做到 ',
    'side': '(每侧)',
    'final_goal': '最终耐力',
    '_1s10': '1组, 10次',
    '_1s1': '1组, 1次',
    '_1s2': '1组, 2次',
    '_1s3': '1组, 3次',
    '_1s4': '1组, 4次',
    '_1s5': '1组, 5次',
    '_1s6': '1组, 6次',
    '_1s8': '1组, 8次',
    '_1s25': '1组, 25次',
    '_1s100': '1组, 100次',
    '_2s2': '2组, 2次',
    '_2s3': '2组, 3次',
    '_2s5': '2组, 5次',
    '_2s4': '2组, 4次',
    '_2s6': '2组, 6次',
    '_2s7': '2组, 7次',
    '_2s8': '2组, 8次',
    '_2s9': '2组, 9次',
    '_2s10': '2组, 10次',
    '_2s12': '2组, 12次',
    '_2s15': '2组, 15次',
    '_2s20': '2组, 20次',
    '_2s25': '2组, 25次',
    '_2s30': '2组, 30次',
    '_2s35': '2组, 35次',
    '_2s50': '2组, 50次',
    '_3s10': '3组, 10次',
    '_3s20': '3组, 20次',
    '_3s25': '3组, 25次',
    '_3s30': '3组, 30次',
    '_3s35': '3组, 35次',
    '_3s40': '3组, 40次',
    '_3s50': '3组, 50次',
    '_4s40': '4组, 40次',
    '_10s': '10秒',
    '_30s': '30秒',
    '_1m': '1分钟',
    '_2m': '2分钟',
    '_1_1': "第一式 墙壁俯卧撑",
    '_1_2': "第二式 上斜俯卧撑",
    '_1_3': "第三式 膝盖俯卧撑",
    '_1_4': "第四式 半俯卧撑",
    '_1_5': "第五式 标准俯卧撑",
    '_1_6': "第六式 窄距俯卧撑",
    '_1_7': "第七式 偏重俯卧撑",
    '_1_8': "第八式 单臂半俯卧撑",
    '_1_9': "第九式 杠杆俯卧撑",
    '_1_10': "最终式 单臂俯卧撑",
    '_2_1': "第一式 肩倒立深蹲",
    '_2_2': "第二式 折刀深蹲",
    '_2_3': "第三式 支撑深蹲",
    '_2_4': "第四式 半深蹲",
    '_2_5': "第五式 标准深蹲",
    '_2_6': "第六式 窄距深蹲",
    '_2_7': "第七式 偏重深蹲",
    '_2_8': "第八式 单腿半深蹲",
    '_2_9': "第九式 单腿辅助深蹲",
    '_2_10': "最终式 单腿深蹲",
    '_3_1': "第一式 垂直引体",
    '_3_2': "第二式 水平引体向上",
    '_3_3': "第三式 折刀引体向上",
    '_3_4': "第四式 半引体向上",
    '_3_5': "第五式 标准引体向上",
    '_3_6': "第六式 窄距引体向上",
    '_3_7': "第七式 偏重引体向上",
    '_3_8': "第八式 单臂半引体向上",
    '_3_9': "第九式 单臂辅助引体向上",
    '_3_10': "最终式 单臂引体向上",
    '_4_1': "第一式 坐姿屈膝",
    '_4_2': "第二式 平卧抬膝",
    '_4_3': "第三式 平卧屈举腿",
    '_4_4': "第四式 平卧蛙举腿",
    '_4_5': "第五式 平卧直举腿",
    '_4_6': "第六式 悬垂举腿",
    '_4_7': "第七式 悬垂屈举腿",
    '_4_8': "第八式 悬垂蛙举腿",
    '_4_9': "第九式 悬垂半举腿",
    '_4_10': "最终式 悬垂直举腿",
    '_5_1': "第一式 短桥",
    '_5_2': "第二式 直桥",
    '_5_3': "第三式 高低桥",
    '_5_4': "第四式 顶桥",
    '_5_5': "第五式 半桥",
    '_5_6': "第六式 标准桥",
    '_5_7': "第七式 下行桥",
    '_5_8': "第八式 上行桥",
    '_5_9': "第九式 合桥",
    '_5_10': "最终式 铁板桥",
    '_6_1': "第一式 靠墙顶立",
    '_6_2': "第二式 乌鸦式",
    '_6_3': "第三式 靠墙倒立",
    '_6_4': "第四式 半倒立撑",
    '_6_5': "第五式 标准倒立撑",
    '_6_6': "第六式 窄距倒立撑",
    '_6_7': "第七式 偏重倒立撑",
    '_6_8': "第八式 单臂半倒立撑",
    '_6_9': "第九式 杠杆倒立撑",
    '_6_10': "最终式 单臂倒立撑",
    'wechat_login':'微信登录',
    'fb_login':'Facebook登录',
    'phone_login':'手机登录',
    'send_verify':'请稍后，你将会受到一条验证码短信',
    'finish':'完成',
    'you_phone':'您的手机号码是',
    'v_code':'验证码',
    'send_again':'再发一次',
    'input_v_code':'输入验证码',
    'times':'次'
  },
  'zh-Hant-CN': Hans,
  'zh-TW': Hans,
}

var storage = new Storage({
  //最大容量，默认值1000条数据循环存储
  size: 1000,

  //数据过期时间，默认一整天（1000 * 3600 * 24秒）
  defaultExpires: 1000 * 3600 * 24 * 365 * 10,

  //读写时在内存中缓存数据。默认启用。
  enableCache: true,

  //如果storage中没有相应数据，或数据已过期，
  //则会调用相应的sync同步方法，无缝返回最新数据。
  sync: {
    //同步方法的具体说明会在后文提到
  }
});
global.storage = storage;

var MainView = React.createClass({
  render: function () {
    return (<ExNavigator
        initialRoute={Router.getTypeList()}
        style={{ flex: 1 }}
        showNavigationBar={false}
        />);
  }
});

var WelcomeView = React.createClass({
  render: function () {
    return (<ExNavigator
        initialRoute={Router.getWelcome()}
        style={{ flex: 1 }}
        showNavigationBar={false}
        />);
  }
});

var PrisonerFitness = React.createClass({
  mixins: [Reflux.connect(UserStore)],
  render: function () {
    var view;
    if (this.state.user.username) {
      view = <MainView />;
    } else {
      view = <WelcomeView />;
    }
    return view;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PrisonerFitness', () => PrisonerFitness);
