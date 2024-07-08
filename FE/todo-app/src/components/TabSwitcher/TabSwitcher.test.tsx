import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabSwitcher from '.';

const mockTabs = ['Test1', 'Test2', 'Test3'];
const setActiveTab = jest.fn();

const setup = (activeTab = null) =>
  render(
    <TabSwitcher
      tabs={mockTabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />,
  );

describe('TabSwitcher', () => {
  it('should render a button for each tab item', () => {
    const { getAllByRole } = setup();

    expect(getAllByRole('button').length).toBe(mockTabs.length);
  });

  it('should call the set active tab method when a user clicks a tab', async () => {
    const user = userEvent.setup();
    const { getByRole } = setup();

    await user.click(getByRole('button', { name: new RegExp(mockTabs[1]) }));

    expect(setActiveTab).toHaveBeenCalledWith(mockTabs[1]);
  });

  it('should set the first tab from props as active if no active tab is passed', () => {
    setup();

    expect(setActiveTab).toHaveBeenCalledWith(mockTabs[0]);
  });
});
