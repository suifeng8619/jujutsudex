import { Zap } from 'lucide-react';

interface MovesetListProps {
    moves: string[];
}

export function MovesetList({ moves }: MovesetListProps) {
    return (
        <div className="space-y-3">
            {moves.map((move, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/30 p-4 transition-colors hover:border-red-900/30 hover:bg-red-950/10"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <Zap className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-neutral-200">{move}</span>
                </div>
            ))}
        </div>
    );
}
