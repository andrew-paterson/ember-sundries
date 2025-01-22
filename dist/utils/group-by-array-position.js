import { isPresent } from '@ember/utils';

function groupByArrayPosition(collection, position) {
  let groups = [];
  collection.forEach(function (item) {
    // console.log(item);
    let value = item[position];
    let group = groups.findBy('value', value);
    if (isPresent(group)) {
      group.items.push(item);
    } else {
      group = {
        value: value,
        items: [item]
      };
      groups.push(group);
    }
  });
  return groups;
}

export { groupByArrayPosition as default };
//# sourceMappingURL=group-by-array-position.js.map
