// app/admin/sections/page.tsx
"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashbord/DashboardLayout';
import { Supabase } from '../../lib/supabase-client';
import type { Section, Course } from '../../types/course';

export default function SectionsManagement() {
  const [sections, setSections] = useState<Section[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState({
    course_id: 0,
    section_label: '',
    capacity: 30,
    location: '',
    status: 'open' as 'open' | 'closed',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sectionsRes, coursesRes] = await Promise.all([
        Supabase.from('section').select('*, course(*)').order('created_at', { ascending: false }),
        Supabase.from('course').select('*').order('title'),
      ]);

      if (sectionsRes.error) throw sectionsRes.error;
      if (coursesRes.error) throw coursesRes.error;

      setSections(sectionsRes.data || []);
      setCourses(coursesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSection) {
        const { error } = await Supabase
          .from('section')
          .update(formData)
          .eq('id', editingSection.id);

        if (error) throw error;
      } else {
        const { error } = await Supabase
          .from('section')
          .insert([formData]);

        if (error) throw error;
      }

      setShowForm(false);
      setEditingSection(null);
      setFormData({ course_id: 0, section_label: '', capacity: 30, location: '', status: 'open' });
      fetchData();
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleEdit = (section: Section) => {
    setEditingSection(section);
    setFormData({
      course_id: section.course_id,
      section_label: section.section_label,
      capacity: section.capacity,
      location: section.location || '',
      status: section.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      const { error } = await Supabase
        .from('section')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingSection(null);
    setFormData({ course_id: 0, section_label: '', capacity: 30, location: '', status: 'open' });
  };

  if (loading) {
    return (
      <DashboardLayout title="Sections Management" requiredRole="admin">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Sections Management" requiredRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sections
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Section
          </button>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingSection ? 'Edit Section' : 'Add New Section'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <select
                  value={formData.course_id}
                  onChange={(e) => setFormData({ ...formData, course_id: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value={0}>Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_code} - {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Section Label</label>
                <input
                  type="text"
                  value={formData.section_label}
                  onChange={(e) => setFormData({ ...formData, section_label: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'closed' })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingSection ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {sections.map((section) => (
                <tr key={section.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {section.course?.course_code} - {section.course?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {section.section_label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {section.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      section.status === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {section.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(section)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}