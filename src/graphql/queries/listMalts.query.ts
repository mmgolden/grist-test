import gql from 'graphql-tag';
import { listMalts } from '../queries';

export const listMaltsQuery = gql(listMalts);
