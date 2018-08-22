import { gQLFetch } from "utils/glqFetch";
import gql from "../../node_modules/graphql-tag";

const listingResultShape = ` 
    date_of_birth
    id
    first_name
    last_name
    application_id
    age
    designation
    gender
    mobile
    alternate_mobile
    candidate_id
    email
    is_transferred
    eligible_for_pf
    eligible_for_esic
    eligible_for_insurance
    status
    spine_id
    date_of_joining
    organization {
      id
      popular_name
    }
    branch
    designation
    state {
      name
      id
    }
    bank_account {
      bank_name
      holder_name
      account_number
      ifsc_code
      proof
      status
      rejection_comment
    }
    esic {
      number
      father_name
      father_dob
      mother_name
      mother_dob
      spouse_name
      spouse_dob
      status
      rejection_comment
    }
    insurance_nominee {
      name
      relation
    }
    address {
      local
      permanent
      status
      proof
      rejection_comment
    }
    salary_structure {
      id
      components {
        id
        type
        category
        value
      }
      components_grouped
    }
    id_card_required
    photo {
      proof
      status
      rejection_comment
    }
    pan {
      number
      proof
      rejection_comment
      status
    }
    uan {
      number
      status
      rejection_comment
    }
    pf {
      number
      status
      rejection_comment
    }
    aadhaar {
      number
      status
      rejection_comment
      proof
    }
    net_paid_salary {
      month(format: "MMM-YY")
      value
    }
  `;

export const employeeListQuery = gql`
  query employeeListQuery(
    $filters: FilterInput
    $first: Int
    $after: Int
    $searchterm: String
    $sort: String
  ) {
    nodes(
      filter: $filters
      type: Employee
      first: $first
      after: $after
      query: $searchterm
      sort: $sort
    ) {
      totalCount
      edges {
        ... on Employee {
          ${listingResultShape}
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export default class EmployeeApi {
  static get(filters?: any) {
    return gQLFetch(employeeListQuery, {
      first: 15,
      filters
    });
  }
}
