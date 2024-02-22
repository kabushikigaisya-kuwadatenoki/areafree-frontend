import { createTheme } from '@mantine/core'

export const theme = createTheme({
  components: {
    Accordion: {
      styles: {
        item: {
          fontSize: '10px',
          borderBottom: 'unset',
        },
        control: {
          fontSize: '10px',
          borderBottom: '1px solid #33947D',
        },
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: 'default',
      },
      styles: {
        border: 'unset',
      },
    },
  },
  primaryColor: 'primary',
  colors: {
    primary: [
      '#E6F2F1',
      '#B4DDCE',
      '#82C9AB',
      '#50B488',
      '#33947D',
      '#2E8571',
      '#297665',
      '#246759',
      '#1F584D',
      '#1A4941',
    ],
    secondary: [
      '#F4FBFA',
      '#E8F6F5',
      '#DCEFEF',
      '#CFE9EA',
      '#CDE8E2',
      '#B5D1CB',
      '#9DBBB4',
      '#85A49D',
      '#6D8E86',
      '#56786F',
    ],
  },
  headings: {
    fontWeight: '400',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
  },
  shadows: {
    sm: '0 0px 2px rgba(0, 0, 0, 0.25)',
    md: '0 0px 4px rgba(0, 0, 0, 0.25)',
    lg: '0 0px 8px rgba(0, 0, 0, 0.25)',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
  },
})
