import { create } from "zustand";

interface VoteState {
  guestVoteCount: number;
  votes: { [key: number]: { option1: boolean; option2: boolean } };
  incrementGuestVoteCount: () => void;
  setVote: (postId: number, option: string, hasVoted: boolean) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  guestVoteCount: 0,
  votes: {},
  incrementGuestVoteCount: () => set((state) => ({ guestVoteCount: state.guestVoteCount + 1 })),
  setVote: (postId, option, hasVoted) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [postId]: { ...(state.votes[postId] || {}), [option]: hasVoted },
      },
    })),
}));
