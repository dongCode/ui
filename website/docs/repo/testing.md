---
id: testing
title: 测试
slug: /testing
---

我们正在使用测试来确保组件在版本和编辑之间保持功能正确。
现存的许多用于 JavaScript 和 React Native 的测试库，可根据正在进行的测试类型进行选择。

Dplus UI 上使用的测试类型是 [Snapshot](#snapshot-testing)
和 [Functional](#functional-testing) 测试。

## Snapshot Testing 快照测试

快照测试听起来就像它所做的一样！ 它拍摄渲染结构的快照
并将组件的 props 及其值保存。 每当进行更改时，它都会将其与原始快照进行比较 -
只是为了非常确定您想要进行的更改会产生预期的结果。
如果结果符合您的预期，那么您需要**更新快照**，以便您的更改将是新的
用于比较未来变化的标准。

要更新快照，请运行此命令：

```bash
# yarn
yarn test -u

# npm
npm run test -u
```

对于快照测试，我们使用 [Jest](https://jestjs.io/)。

您可以在 [此处](https://jestjs.io/docs/en/snapshot-testing.html) 阅读有关快照测试的更多信息。

## Functional Testing 功能测试

功能测试确保组件以其应有的方式运行， 这个很重要

例如：

```MD
如果用户触摸按钮组中的按钮，则应突出显示所选按钮
而前一个未突出显示。
```

对于功能测试，我们使用 [React Native 测试库](https://callstack.github.io/react-native-testing-library/)。

您可以在 [此处](https://www.guru99.com/functional-testing.html) 阅读有关功能测试的更多信息。
