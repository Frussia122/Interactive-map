import {
  faCarSide,
  faWalking,
  faBusSimple,
  faBicycle,
} from '@fortawesome/free-solid-svg-icons';

const routeTypes = [
  {
    id: 'asdasd',
    type: 'auto',
    description: 'Cars, moto and other',
    icon: faCarSide,
  },
  {
    id: 'gasda',
    type: 'pedestrian',
    description: 'by walking',
    icon: faWalking,
  },
  {
    id: 'agasdas',
    type: 'masstransit',
    description: 'Public transport',
    icon: faBusSimple,
  },
  {
    id: 'ahasda',
    type: 'bicycle',
    description: 'bicycle',
    icon: faBicycle,
  },
];
export default routeTypes;
