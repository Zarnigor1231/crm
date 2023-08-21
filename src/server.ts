import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CenterRoute } from './routes/centers.router';
import { DepartmentRoute } from './routes/departments.router';
import { DirectionRoute } from './routes/directions.router';
import { GroupRoute } from './routes/groups.router';
import { PositionRoute } from './routes/positions.router';
import { OutlayRoute } from './routes/outlays.router';
import { IncomeRoute } from './routes/incomes.router';
import { CheckRoute } from './routes/checks.router';

ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new CenterRoute(),
  new DepartmentRoute(),
  new DirectionRoute(),
  new GroupRoute(),
  new PositionRoute(),
  new OutlayRoute(),
  new IncomeRoute(),
  new CheckRoute(),
]);

app.listen();
