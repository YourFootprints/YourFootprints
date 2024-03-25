import '@/index.css'
import { css } from "@emotion/react";

export const svgTheme = {
  // fill만 
  fill: css({
    '@media(prefers-color-scheme: light)': {
      "path": {
        fill: "var(--black)"
      },
    },
    '@media(prefers-color-scheme: dark)': {
      "path": {
        fill: "var(--white)"
      },
    },
  }),

  // stroke만
  stroke: css({
    '@media(prefers-color-scheme: light)': {
      "path": {
        stroke: "var(--black)"
      },
    },
    '@media(prefers-color-scheme: dark)': {
      "path": {
        stroke: "var(--white)"
      },
    },
  }),

  // fill, stroke 둘다
  both: css({
    '@media(prefers-color-scheme: light)': {
      "path": {
        fill: "var(--black)",
        stroke: "var(--black)"
      },
    },
    '@media(prefers-color-scheme: dark)': {
      "path": {
        fill: "var(--white)",
        stroke: "var(--white)"
      },
    }, 
  })
}

export const backgroundTheme = {
  basic: css({
    '@media (prefers-color-scheme: light)': {
      background: "var(--white)",
    },
    '@media (prefers-color-scheme: dark)': {
      background: "var(--black)",
    }
  }),
  custom: css({
    '@media (prefers-color-scheme: light)': {
      background: "var(--gray-50)",
    },
    '@media (prefers-color-scheme: dark)': {
      background: "var(--gray-150)",
    }
  }),
}

// 거의 안 쓰일 것 같긴한데 일단 넣었습니다
export const fontTheme = css({
  '@media (prefers-color-scheme: light)': {
    color: "var(--black)",
  },
  '@media (prefers-color-scheme: dark)': {
    color: "var(--white)",
  }
})