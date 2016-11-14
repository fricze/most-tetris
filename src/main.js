import 'babel-polyfill';

import {
  periodic,
  iterate,
  from,
  join,
  combine
} from 'most';

import Renderer from 'renderer';

import View from 'view';
import Intent from 'intent';
import Model from 'model';

const view = View();
const intent = Intent(view);
const model = Model(intent);

Renderer.render(model);
