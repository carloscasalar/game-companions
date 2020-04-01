# Contributing

## Semantic commit messages
I'm using [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).
To enforce them you can add a git hook following [this guide](https://github.com/hazcod/semantic-commit-hook) 
**TL;DR** *type the following curl command in the root project folder*: 
```
curl --fail -o .git/hooks/commit-msg https://raw.githubusercontent.com/hazcod/semantic-commit-hook/master/commit-msg \
  && chmod 500 .git/hooks/commit-msg` .
```

## Lerna monorepo
This is a [Lerna monorepo](https://github.com/lerna/lerna). I've followed this guide, which I've found so useful an clean: https://dev.to/shnydercom/monorepos-lerna-typescript-cra-and-storybook-combined-4hli

## Mermaid diagrams
I use [mermaid](https://mermaid-js.github.io/mermaid/#/) diagrams in some of the docs, but there is no github support 
for them. To see them in GitGub site you need a [browser plugin](https://github.com/BackMarket/github-mermaid-extension).

I also use this online tool to preview the diagrams: https://mermaid-js.github.io/mermaid-live-editor/ 
