import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Layout, ModuleDetail, QueryResult } from '../components';

/**
 * GET_MODULE_AND_PARENT_TRACK gql query to retrieve a specific module and its parent track,
 * both needed for the ModuleDetail component
 */
const GET_MODULE_AND_PARENT_TRACK = gql`
query Module($moduleId: ID!) {
  module(id: $moduleId) {
    id
    title
    length
    durationInSeconds
    content
    videoUrl
    track {
      id
      title
      modules {
        id
        title
        length
        durationInSeconds
      }
    }
  }
}
`;

/**
 * Module page fetches both parent track and module's data from the gql query GET_MODULE_AND_PARENT_TRACK
 * and feeds them to the ModuleDetail component
 */
const Module = ({ moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: { moduleId },
  });

  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.module?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
