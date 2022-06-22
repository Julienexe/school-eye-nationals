import { mathTopics, physicsTopics, chemistryTopics } from './topics';
import axios from 'axios';
import '../axios';
import {
  mathSubTopics,
  physicsSubTopics,
  chemistrySubTopics,
} from './subtopics';

const topics = [
  {
    subject: 'math',
    topics: [
      mathTopics.map((topic, index) => {
        return {
          title: topic,
          topicCoverage: 0,

          subTopics: [...mathSubTopics[index]],
        };
      }),
    ],
  },
  {
    subject: 'physics',
    topics: [
      physicsTopics.map((topic, index) => {
        return {
          title: topic,
          topicCoverage: 0,

          subTopics: [...physicsSubTopics[index]],
        };
      }),
    ],
  },
  {
    subject: 'chemistry',
    topics: [
      chemistryTopics.map((topic, index) => {
        return {
          title: topic,
          topicCoverage: 0,

          subTopics: [...chemistrySubTopics[index]],
        };
      }),
    ],
  },
];
// const postTask = async () => {
//   try {
//     const { data } = await axios.post(`profile/`, {
//       coverage: JSON.stringify(topics),
//       user: 11,
//     });
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// postTask();
export default topics;
