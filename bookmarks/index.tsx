import { BookmarkCard } from "@/bookmarks/Card";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/settings";

export const BookmarkView = () => {
	// Zustand ストアから必要な state を取得
	const { settings, loading, error } = useSettingsStore();

	// ローディング中
	if (loading) {
		return <p className="text-md">読み込み中...</p>;
	}

	// エラー時
	if (error) {
		return <p className="text-red-500">エラー: {error}</p>;
	}

	// 設定がまだ保存されていない場合（初回起動など）
	if (!settings) {
		return <p className="text-md">まだブックマークが設定されていません。</p>;
	}

	return (
		<>
			<p className="text-md">ブックマーク一覧</p>

			<div
				className={cn(
					"p-4 max-w-6xl mx-auto",
					"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
				)}
			>
				{settings.bookmarks.map((bookmark) => (
					<BookmarkCard bookmark={bookmark} key={bookmark.url} />
				))}
			</div>
		</>
	);
};
