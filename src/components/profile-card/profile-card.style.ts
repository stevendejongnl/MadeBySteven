import { css } from 'lit';

export const profileCardStyles = css`
  :host {
    display: block;
    animation: fadeIn 0.5s ease-out;
  }

  .profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px;
    transition: transform 0.3s ease;
  }

  .profile-card:hover {
    transform: scale(1.02);
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #50fa7b;
    opacity: 0;
    animation: fadeInScale 0.5s ease-out 0.2s forwards;
  }

  .avatar.loading {
    background-color: #44475a;
    opacity: 1;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .username {
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 18px;
    color: #50fa7b;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  .username:hover {
    opacity: 0.8;
  }

  .profile-link {
    color: #8be9fd;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;
  }

  .profile-link:hover {
    color: #50fa7b;
    text-decoration: underline;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;
