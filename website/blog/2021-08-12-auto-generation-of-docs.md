---
title: 文档自动生成
---

> 这是自动生成 UI 组件文档的指南。

最初当这个工作流不存在时，网站的整个文档是通过手动编辑文档来完成的，方法是转到 website 下的 docs 目录并手动编辑 markdown。 现在，我们有了一个流程，开发人员和贡献者可以更多地关注逻辑而不是编写 markdown。

## 工作流程

为此，我们创建了脚本来解析组件并从中生成文档。

这是一个两步过程：

1. 我们使用 `react-docgen-typescript`，它接受我们想要自动生成文档的文件的输入。 这给出了 JSON 作为输出。 此 JSON 包含组件的所有详细信息，包括“类型”、“名称”、“描述”和“默认值”以及组件的“描述”。

2. 由于我们的文档网站使用的是 Docusaurus，所以文档的页面应该是 Markdown 格式。 因此，应该有一个过程可以将我们从 `react-docgen-typescript` 获得的 JSON 数据更改为合适的 Markdown 格式。 为此，我们使用 `json2md` 接收数据并将其转换为合适的 markdown 字符串。 存储在目录中并显示在网站上。

#### 这是如何工作的

为了使脚本自动运行，我们所做的如下：

1. 当您将更改推送到您的分支时。 脚本 updateDocumentation.js 运行。

2. 这会调用 `yarn docs-build` 命令，该命令会调用自动生成文档的脚本，同时也会 _lints_ 生成的 markdown 文件。

3.现在，如果 markdown 文件有任何变化。 在对分支完成提交后，完成并推送带有消息“更新文档”的提交。

**注意：** 通过 pre-push hook 将导致文档更新失败，并可能导致维护者关闭您的 PR。

## 更新现有组件

这很简单。 添加、删除、更新道具现在也很简单。 您只需要更新组件的评论/描述并处理您的 React 组件的逻辑（如果需要）。 我们的工作流将自动检测 markdown 更改（如果有），并在您将代码推送到分支时使用 `pre-push` 挂钩推送更改。

## 添加新组件

相信我，这很容易。 我们设计了工作流程，您只需处理 JavaScript/TypeScript 逻辑，而无需费心更新 markdown 文件。 docgenParser 的输入是自动的，不需要任何额外的配置。

**确保添加与组件和组件道具相关的适当评论和描述。 尝试使用更简单的类型保持代码简单，以便 Autogen 工作。**

**请注意：**组件的文件名以及文件夹必须大写。 我们使用 regex 来解析文件路径，所以这很重要。

**注意**：如果有复杂类型/默认值，请前往 `website/scripts/docgen/docgenParser.ts` 来处理这些情况。 尽管我们建议您尽可能避免使用它。 尝试改进 React 逻辑，这会奏效。

## 如何为组件添加新的 demo？

现在可以通过移动到 website/docs/main 目录下的 usage 目录来添加演示。 我们现在添加了 Snack Player，以便您可以一瞥该组件并了解它的工作原理。 在 usage 下，每个 UI Component 都有一个单独的文件夹，您可以在其中添加与组件相关的 Usage 和相关说明。

**注意**：要添加 Snack 演示，请将其添加到 snack 目录中。 您可以添加尽可能多的 Snack，这将使我们的存储库对开发人员更有帮助。

## 测试变化

为了测试文档自动生成的变化，我们只需要按顺序运行以下命令。

```bash
cd website
yarn test
```

我们还在主要测试过程中包含了更改，因此这将自动与工作流一起运行，以及当您从项目的根目录运行 `yarn test` 命令时。

## 将来

一些组件是基于类的。 它们是：Input、SearchBar、Rating（来自 https://github.com/Monte9/react-native-ratings）。 如果您将组件更改为基于 Functional/hooks，请将其从 `website/scripts/docgen/getComponentFiles.ts` 下的 `filesToExclude` 数组中删除。 这些是仍然手动处理的组件文件的路径。

因此，为这些组件生成文档并不是很好。 由于现有结构 `react-docgen-typescript` 无法为它们生成相关结果。 因此，我们正在寻找对这些组件的贡献，使它们基于 Functional/hooks。

谢谢。 希望您喜欢新的工作流程。 期待改进和贡献
