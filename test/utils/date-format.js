import test from 'ava'
import {dateFormat} from '../../lib/utils'

test('-', t => {
  const dt = 'Fri Dec 01 2017 13:44:42+08'
  const formated = dateFormat(dt, 'YYYY-MM-DD hh:mm:ss')
  t.is(formated, '2017-12-01 13:44:42')
})

test('/', t => {
  const dt = 'Fri Dec 01 2017 13:44:42+08'
  const formated = dateFormat(dt, 'YYYY/MM/DD hh:mm:ss')
  t.is(formated, '2017/12/01 13:44:42')
})

test('年月日 时分秒', t => {
  const dt = 'Fri Dec 01 2017 13:44:42+08'
  const formated = dateFormat(dt, 'YYYY年MM月DD日 hh时mm分ss秒')
  t.is(formated, '2017年12月01日 13时44分42秒')
})

test('string', t => {
  const dt = new Date('2017-12-01 13:44:42')
  const formated = dateFormat(dt, 'YYYY年MM月DD日 hh时mm分ss秒')
  t.is(formated, '2017年12月01日 13时44分42秒')
})
