module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "uber-eats-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
//apollo에서 데이터의 type을 알 수 있도록!
// 모든 것의 출발점은 dto => schema => type
// apollo를 global, project안에 모두 설치해야함

//apollo client:codegen --target=typescript --outputFlat
