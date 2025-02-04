import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post, PostSchema } from '@/types/blog';
import { toast } from 'react-toastify';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormInputs = z.infer<typeof PostSchema>;

interface BlogFormProps {
  post?: Post;
  onSubmit?: (data: FormInputs) => Promise<void>;
  isEditing?: boolean;
}

export default function BlogForm({ post, onSubmit, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormInputs>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      imageUrl: post?.imageUrl || '',
    }
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      setLoading(true);
      
      if (onSubmit) {
        await onSubmit({
          ...formData,
          tags
        });
        toast.success(isEditing ? 'Post updated successfully' : 'Post created successfully');
        reset();
        router.push('/');
      } else {
        console.error('onSubmit handler is not provided');
        toast.error('Form submission handler is not configured');
      }
    } catch (error) {
      toast.error(isEditing ? 'Failed to update post' : 'Failed to create post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label 
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            {...register('title')}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Content Input */}
        <div>
          <label 
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content *
          </label>
          <textarea
            id="content"
            rows={8}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            {...register('content')}
            aria-describedby={errors.content ? 'content-error' : undefined}
          />
          {errors.content && (
            <p id="content-error" className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Excerpt Input */}
        <div>
          <label 
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            {...register('excerpt')}
          />
        </div>

        {/* Image URL Input */}
        <div>
          <label 
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="imageUrl"
              type="url"
              className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              {...register('imageUrl')}
            />
            <ImagePlus className="w-6 h-6 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        {/* Tags Input */}
        <div>
          <label 
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Press enter to add tags"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 focus:outline-none"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </div>
    </form>
  );
}

