import { GitCommit } from "iconoir-react";

export interface MockEmptyStateProps {
  className?: string;
}

const MockEmptyState = ({ className }: MockEmptyStateProps) => (
  <div className={className}>
    <div className="p-1 bg-gray-100 rounded-md mb-4">
      <GitCommit fontSize={32} />
    </div>
    <span className="text-sm text-black max-w-[70%] text-center">
      Choose a step to see saved mocked responses.
    </span>
  </div>
);

export default MockEmptyState;
